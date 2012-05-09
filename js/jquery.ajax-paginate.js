(function($){

    $.fn.ajaxPaginate = function( options ) {  

        var settings = $.extend( {
            'limit': 10,
            'currentPage': 1,
            'maxPages': 10,
            'count': 0,
            'includeFirst': true,
            'includeLast': true,
            'includePrev': true,
            'includeNext': true,
            'nextText': 'Next',
            'prevText': 'Prev',
            'firstText': 'First',
            'lastText': 'Last',
            'paginationSelector': this.selector, 
            'pageClickCallback': function(){
                                    alert('Get Data from page ' + $(this).attr('data-page') + ' limit=' + settings.limit);
                                },
            'pageClickCallbackData': {}
            
        }, options);

        if (settings.pageClickCallbackData.hasOwnProperty('page')){
            settings.currentPage = settings.pageClickCallbackData.page;
            delete settings.pageClickCallbackData.page;
        }

        if (settings.pageClickCallbackData.hasOwnProperty('limit')){
            delete settings.pageClickCallbackData.limit;
        }

        return this.each(function() {        
 
            var totalPages = parseInt(settings.count / settings.limit) + 1;
            var rows = '';
    
            if (settings.count < limit){
                rows = '';
            }else if (settings.maxPages > totalPages){
                for (var i=1; i<=totalPages; i++){
                    rows += "<li data-page='"+i+"' " + ((i == settings.currentPage) ? "class='current' " : "" ) + ">" + i + "</li>";
                }
            }else{
                rows += settings.includeFirst ? "<li data-page='1' >"+settings.firstText+"</li>" : "";
                rows += settings.includePrev ? "<li data-page='"+(parseInt(settings.currentPage) - 1)+"' >"+settings.prevText+"</li>" : "";
            
                var startPage = settings.currentPage - parseInt((settings.maxPages - 1) / 2);
    
                var endPage = startPage + settings.maxPages - 1;
    
                startPage = (startPage > 1) ? startPage : 1;
    
                startPage = (endPage < totalPages) ? startPage : (totalPages - settings.maxPages + 1);
    
                endPage = startPage + settings.maxPages - 1;
    
                for (var i=startPage; i<=endPage; i++){
                    rows += "<li data-page='"+i+"' " + ((i == settings.currentPage) ? "class='current' " : "" ) + ">" + i + "</li>";
                }
    
                rows += settings.includeNext ? "<li data-page='"+(parseInt(settings.currentPage) + 1)+"' >"+settings.nextText+"</li>" : "";
                rows += settings.includeLast ? "<li data-page='"+totalPages+"' >"+settings.lastText+"</li>" : "";
        
            } 
       
            $(settings.paginationSelector).html(rows);
   
            if (rows != ''){ 
                $(settings.paginationSelector + ' li').click(function(){
                    settings.pageClickCallbackData.page = $(this).attr('data-page');
                    settings.pageClickCallbackData.limit = settings.limit;
                    settings.pageClickCallback(settings.pageClickCallbackData);
                });
            }
    
         });

    };
})(jQuery);
