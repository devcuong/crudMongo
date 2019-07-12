function getNavRender(current, pages)
    {
       var nav = "" ;
       if(pages > 0)
       {
            nav += "<ul class='pagination text-center'>";
            if(current == 1){
                nav += "<li class='page-item disabled'><a class='page-link'>FIRST</a></li>";
            }
            else{
                nav += "<li class='page-item'><a class='page-link' href='/truyen/list/1'>FIRST</a></li>";
            }
            var i = (Number(current) > 5 ? Number(current) - 4 : 1);
            if(i != 1)
            {
                nav += "<li class='page-item disabled'><a class='page-link'>...</a></li>";
            }
                for(; i<= (Number(current) + 4) && i<= pages; i++)
                {
                    if(i == current)
                    {
                        nav += "<li class='page-item active'><a class='page-link'>" + i + "</a></li>";
                    }
                    else
                    {
                        nav += "<li class='page-item'><a class='page-link' href='/truyen/list/"+i+"'>" + i + "</a></li>";
                    }
                    if(i == Number(current) + 4 && i < pages)
                    {
                        nav += "<li class='page-item disabled'><a class='page-link'>...</a></li>";
                    }
                }
                if(current != pages)
                {
                    nav += "<li class='page-item'><a class='page-link' href='"+pages+"'>LAST</a></li>";
                }
                else
                {
                    nav += "<li class='page-item disabled'><a class='page-link'>LAST</a></li>";
                }
                nav += "</ul>";
       }
       
       return nav;

    }
module.exports = {
    getNavRender
};