<?php
    require $_SERVER['DOCUMENT_ROOT'].'/html/common/connection.php';
		$results = mysqli_query($con,"SELECT * FROM blog_feelsafe");
		//$fullnews = mysqli_fetch_array($results);

    $title = explode('/',$news_title = get_current_url());

    $characters = 250; //Excerpt
 ?>

<main>
<section class="well bg1">
  <div class="container policy-document">
		<div class="row">
<?php
while ($fullnews = mysqli_fetch_array($results)) {

  if ($fullnews['url']==$title[1]){

    $id = $fullnews['id'];
    $current_id = $id;

 ?>

<div class="header_blog">
  <img src="/images/feelsafe-articles.jpg" />
</div>
    <h1 class="news_title"><?=$fullnews['title'];?></h1>
  </div>
<div class="news_section">
        <div class="row">

            <p><?=$fullnews['description']?></p>
<?php
  }
}
  if (!isset($current_id)){
    include $_SERVER['DOCUMENT_ROOT'].'/html/error/404.html';

  }
?>
					</div>
					<hr />
				</div>
			</div>


			<?php
      if (isset($current_id)){

      	$realated_results = mysqli_query($con,"SELECT * FROM blog_feelsafe WHERE status = 'publish' AND ID != $id LIMIT 3");
						$related_news = mysqli_fetch_array($results);
			?>

			<section class="well bg3">
				<div class="container">
				<div class="row offs3">
				<?php	while ($my_results = mysqli_fetch_array($realated_results)) {
					 ?>

							<div class="col-md-4 col-sm-12 col-xs-12">
								<div class="img_featured">
								<a data-fancybox-group="1" href="#">
									<div class="col-sm-5 logo_img">
										<img class="img-responsive related_news" src='<?=$my_results['logo'];?>' alt="">
            			</div>
                  <?php
                    $fullnews_url = $my_results['url'];
                    echo "<a href=\"$fullnews_url\">";  ?>
                    <h6><?=$my_results['title']?></h6>
                  </a>

                <br />
									<!-- <div class="logo_img">

            			</div> -->
								</a>
							</div>


                  <?php  $symbols = substr($my_results['description'], 0, $characters); ?>
                  <div class="relative_article"><?=$symbols?></div>
									<br><br>
									<ul class="pager pager-v3 pager-md no-margin-bottom relative">
										<li class="readmore align_left">
										<?php echo'<a href="'.$my_results['url'].'">Read More <i class="fa fa-chevron-right" aria-hidden="true"></i></a>'; ?>
									</li>
								</ul>
							</div>
						<?php } ?>
						</div>
					</div>
					</section>

					<?php
						$all_results = mysqli_query($con,"SELECT * FROM blog_feelsafe WHERE status = 'publish' AND ID > $current_id LIMIT 1");

						while ($next_results = mysqli_fetch_array($all_results)) {
							$id_next = $next_results['url'];
						}
					 ?>


			<div class="container">
				<ul class="pager pager-v3 pager-md no-margin-bottom">
								 <?php
											echo '<li class="previous_article"><a href="/blog">'.'<< Back to Blog'."</a> ";
								 ?>
								 <?php
								 		if (isset($id_next)){
									  	echo '<li class="next_article"><a href="'.$id_next.'">'.'Next Article >>'."</a> ";
									}
									else {
										//echo '<li class="next_article"><a href="'.$related_news['url'].'">'.'Next Article >>'."</a> ";
									}
								 ?>

						 </ul>
			</div>



<?php } ?>


</div>
</section>
</main>
