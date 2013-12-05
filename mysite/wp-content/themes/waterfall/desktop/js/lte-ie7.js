/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'iconset-bewegungsloft\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-facebook' : '&#xe000;',
			'icon-hack' : '&#xe001;',
			'icon-grouptraining' : '&#xe002;',
			'icon-personaltraining' : '&#xe003;',
			'icon-arrright' : '&#xe004;',
			'icon-arrup' : '&#xe005;',
			'icon-phone' : '&#xe006;',
			'icon-minus' : '&#xe007;',
			'icon-plus' : '&#xe008;',
			'icon-square' : '&#xe009;',
			'icon-arrleft' : '&#xe00a;',
			'icon-arrdown' : '&#xe00b;',
			'icon-mobile' : '&#xe00c;',
			'icon-pc' : '&#xe00d;',
			'icon-tool' : '&#xe00e;',
			'icon-pencil' : '&#xe00f;',
			'icon-mail' : '&#xe010;',
			'icon-letter' : '&#xe011;',
			'icon-place' : '&#xe012;',
			'icon-menu' : '&#xe013;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};