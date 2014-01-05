/* @author: Xavier Damman (@xdamman) - http://github.com/xdamman/selection-sharer - @license: MIT */!function(a){var b=function(b){var c=this;b=b||{},"string"==typeof b&&(b={elements:b}),this.sel=null,this.textSelection="",this.htmlSelection="",this.getSelectionText=function(a){var b="",d="",a=a||window.getSelection();if(a.rangeCount){for(var e=document.createElement("div"),f=0,g=a.rangeCount;g>f;++f)e.appendChild(a.getRangeAt(f).cloneContents());d=e.innerText,b=e.innerHTML}return c.textSelection=d,c.htmlSelection=b||d,d},this.selectionDirection=function(a){var b=a||window.getSelection(),c=document.createRange();if(!b.anchorNode)return 0;c.setStart(b.anchorNode,b.anchorOffset),c.setEnd(b.focusNode,b.focusOffset);var d=c.collapsed?"backward":"forward";return c.detach(),d},this.showPopunder=function(){var b=window.getSelection(),d=c.getSelectionText(b);if(!b.isCollapsed&&d.length>10&&d.match(/ /)){if(c.$popunder.hasClass("fixed"))return c.$popunder[0].style.bottom=0;var e=b.getRangeAt(0),f=e.endContainer.parentNode;if(f==c.lastEndContainerNode)return c.$popunder.removeClass("hidden"),c.$popunder[0].scrollIntoViewIfNeeded(!1),void 0;var g=c.$popunder.hasClass("hidden")?0:500;c.$popunder.addClass("hidden"),setTimeout(function(){c.lastEndContainerNode=f,a(f).after(c.$popunder),setTimeout(function(){c.$popunder.removeClass("hidden"),setTimeout(function(){c.$popunder[0].scrollIntoViewIfNeeded(!1)},100)},100)},g)}else{if(c.$popunder.hasClass("fixed"))return c.$popunder[0].style.bottom="-50px";c.$popunder.addClass("hidden")}},this.show=function(a){setTimeout(function(){var b=window.getSelection(),d=c.getSelectionText(b);if(!b.isCollapsed&&d.length>10&&d.match(/ /)){var e=b.getRangeAt(0),f=e.getBoundingClientRect().top-5,g=f+window.scrollY-c.$popover.height(),h=0;if(a)h=a.pageX;else{var i=b.anchorNode.parentNode;h+=i.offsetWidth/2;do h+=i.offsetLeft;while(i=i.offsetParent)}switch(c.selectionDirection(b)){case"forward":h-=c.$popover.width();break;case"backward":h+=c.$popover.width();break;default:return}c.$popover.removeClass("anim").css("top",g+10).css("left",h).show(),setTimeout(function(){c.$popover.addClass("anim").css("top",g)},0)}},10)},this.hide=function(){c.$popover.hide()},this.smart_truncate=function(a,b){if(!a||!a.length)return a;var c=a.length>b,d=c?a.substr(0,b-1):a;return d=c?d.substr(0,d.lastIndexOf(" ")):d,c?d+"...":d},this.getRelatedTwitterAccounts=function(){var b=[],c=a('meta[name="twitter:creator"]').attr("content")||a('meta[name="twitter:creator"]').attr("value");c&&b.push(c);for(var d=document.getElementsByTagName("a"),e=0,f=d.length;f>e;e++)if(d[e].attributes.href&&"string"==typeof d[e].attributes.href.value){var g=d[e].attributes.href.value.match(/^https?:\/\/twitter\.com\/([a-z0-9_]{1,20})/i);g&&g.length>1&&-1==["widgets","intent"].indexOf(g[1])&&b.push(g[1])}return b.length>0?b.join(","):""},this.shareTwitter=function(b){b.preventDefault(),c.viaTwitterAccount||(c.viaTwitterAccount=a('meta[name="twitter:site"]').attr("content")||a('meta[name="twitter:site"]').attr("value")||"",c.viaTwitterAccount=c.viaTwitterAccount.replace(/@/,"")),c.relatedTwitterAccounts||(c.relatedTwitterAccounts=c.getRelatedTwitterAccounts());var d="“"+c.smart_truncate(c.textSelection.trim(),114)+"”",e="http://twitter.com/intent/tweet?text="+encodeURIComponent(d)+"&related="+c.relatedTwitterAccounts+"&url="+encodeURIComponent(window.location.href);c.viaTwitterAccount&&d.length<114-c.viaTwitterAccount.length&&(e+="&via="+c.viaTwitterAccount);var f=640,g=440,h=screen.width/2-f/2,i=screen.height/2-g/2-100;return window.open(e,"share_twitter","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+f+", height="+g+",       top="+i+", left="+h),c.hide(),!1},this.shareEmail=function(){var b=c.htmlSelection.replace(/<p[^>]*>/gi,"\n").replace(/<\/p>|  /gi,"").trim(),d={};return d.subject=encodeURIComponent("Quote from "+document.title),d.body=encodeURIComponent("“"+b+"”")+"%0D%0A%0D%0AFrom: "+document.title+"%0D%0A"+window.location.href,a(this).attr("href","mailto:?subject="+d.subject+"&body="+d.body),c.hide(),!0},this.render=function(){var b='<div class="selectionSharer" id="selectionSharerPopover" style="position:absolute;">  <div id="selectionSharerPopover-inner">    <ul>      <li><a class="tweet" href="" title="Share this selection on Twitter" target="_blank">Tweet</a></li>      <li><a class="email" href="" title="Share this selection by email" target="_blank"><svg width="20" height="20"><path stroke="#FFF" stroke-width="6" d="m16,25h82v60H16zl37,37q4,3 8,0l37-37M16,85l30-30m22,0 30,30"/></svg></a></li>    </ul>  </div>  <div class="selectionSharerPopover-clip"><span class="selectionSharerPopover-arrow"></span></div></div>',d='<div class="selectionSharer" id="selectionSharerPopunder">  <div id="selectionSharerPopunder-inner">    <ul>      <li><label>Share this selection</label></li>      <li><a class="tweet" href="" title="Share this selection on Twitter" target="_blank">Tweet</a></li>      <li><a class="email" href="" title="Share this selection by email" target="_blank"><svg width="20" height="20"><path stroke="#FFF" stroke-width="6" d="m16,25h82v60H16zl37,37q4,3 8,0l37-37M16,85l30-30m22,0 30,30"/></svg></a></li>    </ul>  </div></div>';c.$popover=a(b),c.$popover.find("a.tweet").click(c.shareTwitter),c.$popover.find("a.email").click(c.shareEmail),a("body").append(c.$popover),c.$popunder=a(d),c.$popunder.find("a.tweet").click(c.shareTwitter),c.$popunder.find("a.email").click(c.shareEmail),a("body").append(c.$popunder)},this.setElements=function(b){"string"==typeof b&&(b=a(b)),c.$elements=b instanceof a?b:a(b),c.$elements.mouseup(c.show).mousedown(c.hide),c.$elements.bind("touchstart",function(){c.isMobile=!0}),document.onselectionchange=c.selectionChanged},this.selectionChanged=function(a){c.isMobile&&(c.lastSelectionChanged&&clearTimeout(c.lastSelectionChanged),c.lastSelectionChanged=setTimeout(function(){c.showPopunder(a)},300))},this.render(),b.elements&&this.setElements(b.elements)};"function"==typeof define?define(function(){return b}):window.SelectionSharer=b}(jQuery);