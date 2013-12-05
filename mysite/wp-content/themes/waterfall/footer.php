<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package waterfall
 */
?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="site-info">
			<?php do_action( 'waterfall_credits' ); ?>
			<a href="http://wordpress.org/" rel="generator"><?php printf( __( 'Proudly powered by %s', 'waterfall' ), 'WordPress' ); ?></a>
			<span class="sep"> | </span>
			<?php printf( __( 'Theme: %1$s by %2$s.', 'waterfall' ), 'waterfall', '<a href="http://underscores.me/" rel="designer">Underscores.me</a>' ); ?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>