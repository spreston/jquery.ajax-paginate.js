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
            'offset': 0,
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
            settings.limit = settings.pageClickCallbackData.limit;
            delete settings.pageClickCallbackData.limit;
        }

        if (settings.pageClickCallbackData.hasOwnProperty('offset')){
            delete settings.pageClickCallbackData.offset;
        }

        return this.each(function() {        
 
            var totalPages = parseInt(settings.count / settings.limit) + 1;
            var rows = '';
    
            if (settings.count < limit){
                rows = '';
            }else if ((settings.maxPages > totalPages) || (settings.maxPages == 0)){
                for (var i=1; i<=totalPages; i++){
                    rows += "<li data-page='"+i+"' class='pagination" + ((i == settings.currentPage) ? " current" : "" ) + "' >" + i + "</li>";
                }
            }else{
                rows += settings.includeFirst ? "<li id='pagination_first' "+((settings.currentPage == 1) ? 'class="disabled" ': '')+"data-page='1' >"+settings.firstText+"</li>" : "";
                rows += settings.includePrev ? "<li id='pagination_prev' "+((settings.currentPage == 1) ? 'class="disabled" ': '')+"data-page='"+(parseInt(settings.currentPage) - 1)+"' >"+settings.prevText+"</li>" : "";
            
                var startPage = settings.currentPage - parseInt((settings.maxPages - 1) / 2);
    
                var endPage = startPage + settings.maxPages - 1;
    
                startPage = (startPage > 1) ? startPage : 1;
    
                startPage = (endPage < totalPages) ? startPage : (totalPages - settings.maxPages + 1);
    
                endPage = startPage + settings.maxPages - 1;
    
                for (var i=startPage; i<=endPage; i++){
                    rows += "<li data-page='"+i+"' class='pagination" + ((i == settings.currentPage) ? " current" : "" ) + "' >" + i + "</li>";
                }
    
                rows += settings.includeNext ? "<li id='pagination_next' "+((settings.currentPage == totalPages) ? 'class="disabled" ': '')+"data-page='"+(parseInt(settings.currentPage) + 1)+"' >"+settings.nextText+"</li>" : "";
                rows += settings.includeLast ? "<li id='pagination_last' "+((settings.currentPage == totalPages) ? 'class="disabled" ': '')+"data-page='"+totalPages+"' >"+settings.lastText+"</li>" : "";
        
            } 
       
            $(settings.paginationSelector).html(rows);
   
            if (rows != ''){ 
                $(settings.paginationSelector + ' li').click(function(){
                    settings.pageClickCallbackData.page = $(this).attr('data-page');
                    settings.pageClickCallbackData.limit = settings.limit;
                    settings.pageClickCallbackData.offset = settings.limit * (settings.pageClickCallbackData.page - 1);
                    settings.pageClickCallback(settings.pageClickCallbackData);
                });
            }
    
         });

    };
})(jQuery);
