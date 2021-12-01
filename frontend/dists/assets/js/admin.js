(function ($) {
    "use strict";
    $(document).ready(function() {
        const $menu = $('.list-language>ul>li');
        $(document).mouseup(e => {
           if (!$menu.is(e.target) && $menu.has(e.target).length === 0)
           {
             $menu.removeClass('is_active');
          }
         });

        $('.list-language>ul>li>a').on('click', () => {
          $menu.toggleClass('is_active');
        });
         $('.list-language ul li .dropdown-menu li a').on('click', () => {
            if($menu.hasClass('is_active')){
                $menu.removeClass('is_active');
            }
        })
         
         function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function (e) {
                    $('#blah').attr('src', e.target.result);
                }
                
                reader.readAsDataURL(input.files[0]);
            }
        }
        
        $("#imgInp").change(function(){
            readURL(this);
        });
        const $dropdown= $('.list-dropdown>ul>li');
        $(document).mouseup(e => {
           if (!$dropdown.is(e.target) && $dropdown.has(e.target).length === 0)
           {
             $dropdown.removeClass('is_active');
          }
         });


        $('.list-dropdown>ul>li>a').on('click', () => {
          $dropdown.toggleClass('is_active');
        });
        $('.list-dropdown .dropdown-menu li a').on('click', () => {
            if($dropdown.hasClass('is_active')){
                $dropdown.removeClass('is_active');
            }
        })

        $(".list-title-tab li:eq(0)").addClass('active');

        $(".list-content .content-tab").not(':eq(0)').addClass('hides');

        $(".list-title-tab li a").click(function(){

            var $this = $(this),
                $href = this.hash,
                $tab = $($href),

                $currentTab = $(".list-content .content-tab:visible");

            $(".list-title-tab li").removeClass('active');

            $this.parent().addClass('active');

            $currentTab.addClass('hides');

            $tab.removeClass('hides');

            return false;

        });
        var height_treedad = $(".tree-binary .tree-structure .tree_dad .list_user-fa").height();
        $(".tree-binary .tree-structure .tree_dad:before").height(height_treedad);
    })
})(jQuery)