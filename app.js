require('babel-polyfill');
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// https://vuejs.org/v2/guide/components.html#Non-Parent-Child-Communication
window.bus = new Vue({
  data: {
    cart: []
  },
  watch: {
    cart: function () {
      this.$emit('cart-needs-refresh')
    }
  },
  created() {
    axios.get('/shop/cart')
      .then(response => {
        this.cart = response.data
    })
  },
  methods: {
    removePhone: function (groupIndex, phoneIndex) {
      var path = '/shop/remove/phone?gi=' + groupIndex + '&pi=' + phoneIndex
      axios.get(path)
      .then(response => {
        this.cart = response.data
      })
    },
    removePlan: function (groupIndex) {
      var path = '/shop/remove/plan?gi=' + groupIndex
      axios.get(path)
      .then(response => {
        this.cart = response.data
      })
    },
    setEsp: function (groupIndex, phoneIndex, esp) {
      var esp = '&esp=' + esp
      var gi = '&gi=' + groupIndex
      var pi = '&pi=' + phoneIndex
      var path = '/shop/set/esp?' + gi + pi + esp
      axios.get(path)
      .then(response => {
        this.cart = response.data
      })
    },
    removeAccessory: function (gi, pi, ai) {
      var path = '/shop/remove/accessory?gi=' + gi + '&pi=' + pi + '&ai=' + ai
      console.log(path)
      axios.get(path)
      .then(response => {
        this.cart = response.data
      })
    },
    removeProductGroup: function (index) {
      var path = '/shop/remove/product-group?index=' + index
      axios.get(path)
      .then(response => {
        this.cart = response.data
      })
    },
  }
});

Vue.component('cart', require('./components/shop/Cart.vue'));
Vue.component('accessory', require('./components/shop/Accessory.vue'));
Vue.component('plan', require('./components/shop/Plan.vue'));
Vue.component('phone', require('./components/shop/Phone.vue'));
Vue.component('checkout', require('./components/shop/Checkout.vue'));
Vue.component('checkout-review', require('./components/shop/CheckoutReview.vue'));
Vue.component('coverage-check', require('./components/CoverageCheck.vue'));

const cart = new Vue({
  el: '#main-menu',
});

const mobilecart = new Vue({
  el: '#cartmobile',
});

const checkout  = new Vue({
  el: 'main',
});

//Show or Hide message 'Yout item was added to cart' depending of device

      var isMobile = {
              Android: function() {
                  return navigator.userAgent.match(/Android/i);
              },
              BlackBerry: function() {
                  return navigator.userAgent.match(/BlackBerry/i);
              },
              iOS: function() {
                  return navigator.userAgent.match(/iPhone|iPod/i);
              },
              Opera: function() {
                  return navigator.userAgent.match(/Opera Mini/i);
              },
              Windows: function() {
                  return navigator.userAgent.match(/IEMobile/i);
              },
              any: function() {
                  return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
              }
          };

          if(isMobile.any()) {

              var whichdropdown = '#mobile-cart-dropdown';

            }
            else

            var whichdropdown = '#desktop-cart-dropdown';



window.loading = function (){
  $('#loading-indicator').show()
  $('body').attr('id', 'body-loading')
}

window.doneLoading = function (){
  $('#loading-indicator').hide()
  $('body').attr('id', '')
}
$('form').each(function(i, obj) {
  $(this).submit(function() {
    loading();
  });
});

/*
 *  Checkbox
 */
$('.checkbox-toggle').each(function(i, obj) {
  $(this).change(function() {
    var target = $(this).data("target")
    var show = !$(this).is(':checked')
    $(target).toggle()
    $(target).find('.required input').attr('required', show)
  });
})

$('#shipping-options').change(function() {
  loading()
  window.location.href='/checkout/billing?shipping=' + $(this).val()

});

$('.loading').each(function() {
  $(this).click(function() {
    loading()
  })
});

$('#payment-method').change(function() {
  loading()
  window.location.href='/checkout/billing?payment=' + $(this).val()

});

$('#bill-toggle').change(function() {
    var target = $(this).data("target")
    var depositTotal = $("#total-with-deposit")
    var total = $("#total-without-deposit")
    var hide = ('MANUAL' == $(this).val())
    if (hide) {
      $(depositTotal).show()
      $(total).hide()
      $(target).hide()
      $(target).find('.required input').attr('required', false)
    } else {
      $(depositTotal).hide()
      $(total).show()
      $(target).show()
      $(target).find('.required input').attr('required', true)
    }
  });
/*
 * Cart Manipulation
 */

// Add Phones to Cart
$('.phone-product').each(function(i, obj) {
  $(this).click(function() {
    var productId = $(this).data("product-id");
    var gi = '&gi=' +  $(this).data("product-group");
    var includeEsp = '&esp=' + $(this).data("include-esp")
    var path = '/shop/add/phone?id=' + productId + includeEsp + gi
    axios.get(path)
      .then(response => {
        bus.cart = response.data
        $(whichdropdown).dropdown('toggle');
    });
  });
})

$('.phone-options').each(function(i, obj) {
  $(this).change(function() {
    var newId = $(this).val()
    var price = $(this).find(':selected').data('price')
    $($(this).data('target')).data('product-id', newId)
    $($(this).data('price-target')).text('$' + price)
  });
})

// Select Appropriate Plan
$('.plan-options').each(function(i, obj) {
  $(this).change(function() {
    var newIndex = $(this).val()
    $($(this).data('target')).data('product-group', newIndex)
  });
})

// Accessories tied to device
$('.accessory-options').each(function(i, obj) {
  $(this).change(function() {
    var newLine = $(this).val()
    $($(this).data('target')).data('line', newLine)
  });
})

// Select a plan
$('.select-plan').each(function(i, obj) {
  $(this).click(function() {
    var productId = $(this).data("product-id");
    var path = '/shop/select/plan?id=' + productId;
    axios.get(path)
      .then(response => {
        bus.cart = response.data
        $(whichdropdown).dropdown('toggle');
    });
  });
})

$('.select-add-on-plan').each(function(i, obj) {
  $(this).click(function() {
    var productId = $(this).data("product-id");
    var addOnId = '&aoid=' + $(this).data("product-add-on-id");
    var path = '/shop/select/plan?id=' + productId + addOnId
    console.log(path)
    axios.get(path)
      .then(response => {
        bus.cart = response.data
        $(whichdropdown).dropdown('toggle');
    });
  });
})

// Add Accessories to Cart
$('.accessory-product').each(function(i, obj) {
  $(this).click(function() {
    var productId = $(this).data("product-id");
    var line = $(this).data("line");
    var path = '/shop/add/accessory?id=' + productId + '&line=' + line
    console.log(path)
    axios.get(path)
      .then(response => {
        bus.cart = response.data
        $(whichdropdown).dropdown('toggle');
    });
  });
})

// Add Mixed Products to Cart
$('.product').each(function(i, obj) {
  $(this).click(function() {
    var path = '/shop/add/mixed?';
    var productIds = _.split($(this).data("product-id"), ' ');
    if($(this).hasClass('clear-cart')){
      path += 'clear=true' + '&'
    }
    _.each(productIds, function (id) { path += 'ids[]=' + id + '&'; });
    //return
    axios.get(path)
      .then(response => {
        bus.cart = response.data
        $(whichdropdown).dropdown('toggle');
    });
  });
})
