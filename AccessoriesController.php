<?php
//Rostyslav
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AccessoriesController extends ProductController
{
    //
    public function showAll($productType = 'accessories', $billingMode = 'shared')
    {
        $promoController = new PromoController;
        $phonePromotions = $promoController->phonePromotions;

        $InventoryType = $this->inventoryTypeMap[$productType];
        $allProducts = collect($this->getAllProducts($InventoryType));
        $BillingMode = $this->request->session()->get('BillingMode', 'POST');


        $cart = session('shop.cart');

        $shopController = new ShopController;

        $dependentIds = collect([]);
        $productGroups = collect($shopController->cart()['productGroups']);
        $i = $productGroups
            ->each(function($group, $key) use (&$dependentIds) {
                $devices = collect($group['devices'])
                    ->each(function($device, $key) use (&$dependentIds) {
                        $ids = collect($device->DependentProducts)
                            ->filter(function( $value, $key) {
                                return 'ACCESSORY' == $value->InventoryType;
                            })
                            ->pluck('ProductId');
                        $dependentIds = $dependentIds->merge($ids);
                    });
            });

        $products = (object) $allProducts
            ->filter(
                function($accessory,$key) use ($BillingMode, $dependentIds) {
                    $sameBillingMode = $accessory->BillingMode == $BillingMode;
                    $isDependent = $dependentIds->isEmpty() || $dependentIds->contains($accessory->ProductId);
                    $hasPrice = floatval($accessory->BaseRate) > 0;
                    return $sameBillingMode && $isDependent && $hasPrice;
                })
            ->sortBy('BaseRate')
            // Add available devices
            ->transform(function($accessory, $key) use ($productGroups) {
                $accessory->_availableDevices = [];
                foreach($productGroups->all() as $planNumber => $productGroup) {
                    foreach($productGroup['devices'] as $devicePosition => $device) {
                        $optionalIds = collect($device->DependentProducts)
                            ->filter(function( $value, $key) {
                                return 'ACCESSORY' == $value->InventoryType;
                            })
                            ->pluck('ProductId')
                            ;
                        if ($optionalIds->contains($accessory->ProductId)){
                            if (count($productGroups) > 1) {
                                $device->_line= $planNumber;
                            } else {
                                $device->_line= $devicePosition;
                            }
                            $accessory->_availableDevices[] = $device;
                        }
                    }
                }
                return $accessory;
            })
            ->all()
            ;

        // Show base view or specific product list if it exists
        return view('accessories',
            [
                'promos' => $phonePromotions,
                'products' => $products,
            ]
        );
    }

}
