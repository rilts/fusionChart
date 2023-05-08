/*amd /cm/template/design_system/design_system.xml 18834 82a304bd282da51c6c09d8fd199ef88e8a22cae588f8a867425eb794ddf8c124 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:7,N:'xml-stylesheet',instruction:'href="/cm/template/design_system/design_system.css" type="text/css"'},{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'DEFAULT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'resource',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'id',name:'id',dataType:'text'}},{T:1,N:'w2:column',A:{id:'category',name:'category',dataType:'text'}},{T:1,N:'w2:column',A:{id:'title',name:'타이틀',dataType:'text'}},{T:1,N:'w2:column',A:{id:'iconSrc',name:'아이콘자원',dataType:'text'}},{T:1,N:'w2:column',A:{id:'previewSrc',name:'미리보기자원',dataType:'text'}},{T:1,N:'w2:column',A:{id:'xmlpath',name:'xml자원',dataType:'text'}},{T:1,N:'w2:column',A:{id:'favMenu',name:'즐겨찾기',dataType:'text'}}]},{T:1,N:'w2:data',E:[{T:1,N:'w2:row'}]}]},{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'category',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'id',name:'name1',dataType:'text'}},{T:1,N:'w2:column',A:{id:'iconSrc',name:'name2',dataType:'text'}},{T:1,N:'w2:column',A:{id:'path',name:'name3',dataType:'text'}}]}]}]},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'script',A:{type:'text/javascript',src:'/cm/template/design_system/studioAPI.js'}},{T:1,N:'script',A:{type:'text/javascript',lazy:'false'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){
scwin.onpageload = function () {

    // requestJson data 생성
    var requestJson = {
        "type": "REQUEST",
        "payload": {
            "type": "READ_FILE_LIST",
            // 전체 리스트를 조회하는 경우는 wds로 날려야함.
            "req": {
                "id": "wds"
            }
        }
    }
    studioAPI.exec(scwin.jsonDataCallBack, {}, requestJson);

    // LEFT메뉴 리사이징
    $(window).resize(function () {
        var win_w = $(this).width();

        if (win_w < 400) {
            $(".designSystem_layout").removeClass("hide_menu");
            $(".designSystem_layout").addClass("hide_menu");
        }
    });
    
};

scwin.onpageunload = function () {

};


scwin.jsonDataCallBack = function (jsonData) {
    var jsonResource = jsonData && jsonData.res ? jsonData.res.resource : [];
    var jsonCategory = jsonData && jsonData.res ? jsonData.res.category : [];


    resource.setJSON(jsonResource);
    category.setJSON(jsonCategory);
    //category 
    for (var i = 0; i < jsonCategory.length; i++) {
        console.log("start[" + i + "]" + jsonCategory[i].id);
        //mf_categoryGen_1_categoryTitleGrp

        var genCatogoryIdx = categoryGen.insertChild();

        var strCategory = jsonCategory[i].id;
        var strCategoryMenuIcon = jsonCategory[i].iconSrc;
        var objCategoryTitle = categoryGen.getChild(genCatogoryIdx, "categoryTitle");
        objCategoryTitle.setValue(strCategory);//category anchor title setting
        var tagCategoryId = objCategoryTitle.getID();//좌측메뉴 클릭시 찾아갈 객체 id 얻어오기

        var objResourceListGen = categoryGen.getChild(genCatogoryIdx, "resourceListGen");

        //category menu setting
        var genCatogoryMenuIdx = categoryMenuGen.insertChild();
        var objCategoryMenu = categoryMenuGen.getChild(genCatogoryMenuIdx, "categoryMenu");
        objCategoryMenu.setValue(strCategory);
        objCategoryMenu.setHref("#" + tagCategoryId);
        atc_search.addItem(strCategory, genCatogoryMenuIdx);

        var objCategoryMenuIcon = categoryMenuGen.getChild(genCatogoryMenuIdx, "categoryMenuIcon");
        objCategoryMenuIcon.setSrc(strCategoryMenuIcon);

        //resource
        var filterCon = { type: 'row', colIndex: 'category', key: "00_화면시작", condition: 'and' };
        filterCon.key = strCategory;
        resource.clearFilter();
        resource.setColumnFilter(filterCon);

        var jsonResForCategory = resource.getAllFilteredJSON();

        for (var j = 0; j < jsonResForCategory.length; j++) {
            console.log("[" + j + "]" + jsonResForCategory[j].id);
            var strRessourceTitle = jsonResForCategory[j].title;
            var strRessourceIcon = jsonResForCategory[j].iconSrc;
            //hidden
            var strResourceId = jsonResForCategory[j].id;
            var strResourceCategory = jsonResForCategory[j].category;
            var strResourcePreviewSrc = jsonResForCategory[j].previewSrc;
            var strResourceXmlpath = jsonResForCategory[j].xmlpath;

            var genResourceIdx = objResourceListGen.insertChild();

            var objResourceTitle = objResourceListGen.getChild(genResourceIdx, "resourceTitle");
            objResourceTitle.setValue(strRessourceTitle);//resource anchor title setting

            var objResourceIcon = objResourceListGen.getChild(genResourceIdx, "resourceIcon");
            objResourceIcon.setSrc(strRessourceIcon);

            var objResourceIconSrc = objResourceListGen.getChild(genResourceIdx, "resourceIconSrc");
            objResourceIconSrc.setValue(strRessourceIcon);

            var objResourceId = objResourceListGen.getChild(genResourceIdx, "resourceId");
            objResourceId.setValue(strResourceId);

            var objResourceCategory = objResourceListGen.getChild(genResourceIdx, "resourceCategory");
            objResourceCategory.setValue(strResourceCategory);

            var objResourcePreviewSrc = objResourceListGen.getChild(genResourceIdx, "resourcePreviewSrc");
            objResourcePreviewSrc.setValue(strResourcePreviewSrc);

            var objResourceXmlpath = objResourceListGen.getChild(genResourceIdx, "resourceXmlpath");
            objResourceXmlpath.setValue(strResourceXmlpath);

            if (jsonResForCategory[j].favMenu == "1") {
                objResourceListGen.getChild(genResourceIdx, "btn_favorit").toggleClass("on");
            }
        }

    }

    // Snippet 미리보기
    $(".btn_snippet").on("click", function () {
        $(".designSystem_zoom_box").addClass("on");
        $(".designSystem_dim").addClass("on");
    });
    $(".btn_zoom_close").on("click", function () {
        $(".designSystem_zoom_box").removeClass("on");
        $(".designSystem_dim").removeClass("on");
    });

    // Snippet 즐겨찾기
    $(".btn_snp_favorit").on("click", function () {
        $(this).toggleClass("on");
    });

    scwin.load_favMenu();
};

// LEFT메뉴 버튼 토클
scwin.btnDsSlide_onclick = function () {
    $(".designSystem_layout").toggleClass("hide_menu");
};

scwin.resourceIcon_onclick = function (e) {
    var genIdx = this.getGeneratedIndex();

    var resourceIdObj = this.getGeneratedComponent("resourceId");
    var resourceCategoryObj = this.getGeneratedComponent("resourceCategory");
    var resourceTitelObj = this.getGeneratedComponent("resourceTitle");
    var resourceIconSrcObj = this.getGeneratedComponent("resourceIconSrc");
    var resourcePreviewSrcObj = this.getGeneratedComponent("resourcePreviewSrc");
    var resourceXmlpathObj = this.getGeneratedComponent("resourceXmlpath");

    console.log(genIdx + "번째 , click한  값 : " + resourceIdObj.getValue() + "\n" + resourceCategoryObj.getValue() + "\n" +
        resourceTitelObj.getValue() + "\n" +
        resourceIconSrcObj.getValue() + "\n" +
        resourcePreviewSrcObj.getValue() + "\n" +
        resourceXmlpathObj.getValue()
    );

    // request json 의 스펙을 생성한다.
    var reqJson = {
        "type": "REQUEST",
        "payload": {
            "type": "INSERT_SNIPPETS",
            "req": {
                "id": "",
                "category": "",
                "title": "",
                "iconSrc": "",
                "previewSrc": "",
                "xmlpath": ""
            },
            "res": {}
        }
    }

    reqJson.payload.req.id = resourceIdObj.getValue();
    reqJson.payload.req.category = resourceCategoryObj.getValue();
    reqJson.payload.req.title = resourceTitelObj.getValue();
    reqJson.payload.req.iconSrc = resourceIconSrcObj.getValue();
    reqJson.payload.req.previewSrc = resourcePreviewSrcObj.getValue();
    reqJson.payload.req.xmlpath = resourceXmlpathObj.getValue();

    studioAPI.exec({}, {}, reqJson);
};
scwin.btn_popup_onclick = function () {
    var preview_src = this.getGeneratedComponent("resourceXmlpath").getValue().split("WebContent")[1].replaceAll("\\", "/");
    wf_preview.setSrc(preview_src);
};
scwin.atc_search_onviewchange = function (info) {

    var idx = info.newValue;
    if (idx == '') {
        $(".li_categoryMenuGen").css("display", "list-item");
        return;
    }
    $(".li_categoryMenuGen").css("display", "none");
    var selected = categoryMenuGen.getChild(idx, "li_category");
    var menu = categoryMenuGen.getChild(idx, "categoryMenu");
    selected.setStyle("display", "list-item");
    menu.trigger("onclick");
};

scwin.load_favMenu = function () {
    var insertIdx = 0;
    if (categoryGen.getChild(insertIdx, "categoryTitle") != null && categoryGen.getChild(insertIdx, "categoryTitle").getValue() == "즐겨찾기") {
        categoryGen.removeChild(insertIdx);
    }
    var filterFav = { type: 'row', colIndex: 'favMenu', key: "1", condition: 'and' };
    resource.clearFilter();
    resource.setColumnFilter(filterFav);
    var favMenuJson = resource.getAllFilteredJSON();

    if (favMenuJson.length > 0) {
        var genCatogoryFavIdx = categoryGen.insertChild(insertIdx);
        var genFavListGen = categoryGen.getChild(genCatogoryFavIdx, "resourceListGen");
        var genTitle = categoryGen.getChild(genCatogoryFavIdx, "categoryTitle");
        genTitle.setValue("즐겨찾기");
        categoryMenuGen.getChild(categoryMenuGen.getLength() - 2, "categoryMenu").setHref("#" + genTitle.getID());
        for (var j = 0; j < favMenuJson.length; j++) {
            console.log("[" + j + "]" + favMenuJson[j].id);
            var strRessourceTitle = favMenuJson[j].title;
            var strRessourceIcon = favMenuJson[j].iconSrc;
            //hidden
            var strResourceId = favMenuJson[j].id;
            var strResourceCategory = favMenuJson[j].category;
            var strResourcePreviewSrc = favMenuJson[j].previewSrc;
            var strResourceXmlpath = favMenuJson[j].xmlpath;

            var genResourceIdx = genFavListGen.insertChild();

            var objResourceTitle = genFavListGen.getChild(genResourceIdx, "resourceTitle");
            objResourceTitle.setValue(strRessourceTitle);//resource anchor title setting

            var objResourceIcon = genFavListGen.getChild(genResourceIdx, "resourceIcon");
            objResourceIcon.setSrc(strRessourceIcon);

            var objResourceIconSrc = genFavListGen.getChild(genResourceIdx, "resourceIconSrc");
            objResourceIconSrc.setValue(strRessourceIcon);

            var objResourceId = genFavListGen.getChild(genResourceIdx, "resourceId");
            objResourceId.setValue(strResourceId);

            var objResourceCategory = genFavListGen.getChild(genResourceIdx, "resourceCategory");
            objResourceCategory.setValue(strResourceCategory);

            var objResourcePreviewSrc = genFavListGen.getChild(genResourceIdx, "resourcePreviewSrc");
            objResourcePreviewSrc.setValue(strResourcePreviewSrc);

            var objResourceXmlpath = genFavListGen.getChild(genResourceIdx, "resourceXmlpath");
            objResourceXmlpath.setValue(strResourceXmlpath);

            genFavListGen.getChild(genResourceIdx, "btn_favorit").toggleClass("on");
            genFavListGen.getChild(genResourceIdx, "btn_favorit").addClass("inFavMenu");
        }
    }
    resource.clearFilter();
    
    // Snippet 미리보기
    $(".btn_snippet").on("click", function () {
        $(".designSystem_zoom_box").addClass("on");
        $(".designSystem_dim").addClass("on");
    });
}
scwin.btn_favorit_onclick = function () {
    var generatorIdx =  this.getGeneratedIndex();
    var id = this.getGenerator().getChild(generatorIdx, "resourceId").getValue();
    var resourceIndex = resource.getMatchedIndex("id", id)[0];
    var status = resource.getRowData(resourceIndex)[6] == "1" ? "0" : "1";
    resource.setCellData(resourceIndex, "favMenu", status);

    var len = $(".btn_snp_favorit.on:not(.inFavMenu)").length;
    var title = this.getGenerator().getChild(generatorIdx, "resourceTitle").getValue();
    for (var i = 0; i < len; i++) {
        var selector = ".btn_snp_favorit.on:eq(" + i + "):not(.inFavMenu)";
        if ($(selector).next().text() == title) {
            $(selector).toggleClass("on");
            return;
        }
    }
    scwin.load_favMenu();
};

}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload','ev:onpageunload':'scwin.onpageunload',style:''},E:[{T:1,N:'xf:group',A:{id:'layout',class:'designSystem_layout',style:''},E:[{T:1,N:'xf:group',A:{class:'designSystem_search',id:'',style:''},E:[{T:1,N:'w2:anchor',A:{class:'btn_designSystem_slide','ev:onclick':'scwin.btnDsSlide_onclick',id:'btnDsSlide',outerDiv:'false',style:''},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'메뉴'}]}]},{T:1,N:'w2:autoComplete',A:{editType:'select',id:'atc_search',useKeywordHighlight:'false',style:'width: 148px;height: 21px;',submenuSize:'auto',search:'contain',autoFocus:'false',allowEmptySubmission:'false',emptyItem:'true',emptyIndex:'1',noResult:'useData','ev:onviewchange':'scwin.atc_search_onviewchange',allOption:'',chooseOption:'',ref:'',placeholder:'Search...'},E:[{T:1,N:'w2:choices',E:[{T:1,N:'w2:item',E:[{T:1,N:'w2:label',E:[{T:4,cdata:'전체'}]},{T:1,N:'w2:value'}]}]}]},{T:1,N:'xf:group',A:{class:'switchbox',id:'',style:'',tagname:''},E:[{T:1,N:'xf:select',A:{appearance:'full',class:'input_switch',cols:'',disabled:'',falseValue:'',id:'switch1',itemTagname:'',nextTabID:'',ref:'',renderType:'native',rows:'',selectedindex:'-1',style:'',tooltipFormatter:'',tooltipItemLabel:'',useLocale:''},E:[{T:1,N:'xf:choices',E:[{T:1,N:'xf:item',E:[{T:1,N:'xf:label'},{T:1,N:'xf:value'}]}]}]},{T:1,N:'xf:group',A:{class:'label_switch',id:'',style:'',tabIndex:'',tagname:'label',text:'',tooltipFormatter:'',userData3:''},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:for',E:[{T:3,text:'mf_switch1'}]}]},{T:1,N:'w2:span',A:{class:'marble',id:'',label:'',ref:'',style:''}},{T:1,N:'w2:span',A:{class:'on',id:'',label:'On',style:''}},{T:1,N:'w2:span',A:{class:'off',id:'',label:'Off',style:''}}]}]}]},{T:1,N:'xf:group',A:{style:'',id:'',class:'designSystem_side'},E:[{T:1,N:'xf:group',A:{style:'',id:'',class:'designSystem_menu'},E:[{T:1,N:'w2:generator',A:{id:'categoryMenuGen',style:'',tagname:'ul'},E:[{T:1,N:'xf:group',A:{id:'li_category',style:'',tagname:'li',class:'li_categoryMenuGen'},E:[{T:1,N:'xf:group',A:{id:'',tagname:'a'},E:[{T:1,N:'w2:attributes',E:[{T:1,N:'w2:href',E:[{T:3,text:'#mf_layout'}]}]},{T:1,N:'xf:image',A:{id:'categoryMenuIcon',src:'/cm/template/snippets/00_화면시작/00_화면시작.png',style:''}}]},{T:1,N:'w2:anchor',A:{class:'designSystem_m_tit',href:'#mf_layout',id:'categoryMenu',outerDiv:'false',style:''},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'화면시작'}]}]}]}]}]}]},{T:1,N:'w2:generator',A:{style:'',id:'categoryGen',class:'designSystem_cont'},E:[{T:1,N:'xf:group',A:{class:'designSystem_dfbox',id:'categoryTitleGrp',style:''},E:[{T:1,N:'w2:textbox',A:{class:'designSystem_df_tit',id:'categoryTitle',label:'화면시작',style:''}}]},{T:1,N:'w2:generator',A:{class:'designSystem_list',id:'resourceListGen',style:'',tagname:'ul'},E:[{T:1,N:'xf:group',A:{class:'item',id:'',style:'',tagname:'li'},E:[{T:1,N:'xf:group',A:{class:'img_box',id:''},E:[{T:1,N:'xf:image',A:{id:'resourceIcon',src:'/cm/template/snippets/00_화면시작/0_01%20페이지시작_icon.png',style:'',tabIndex:'','ev:onclick':'scwin.resourceIcon_onclick'}},{T:1,N:'xf:input',A:{adjustMaxLength:'false',id:'resourceId',style:'width: 144px;height: 21px;',type:'hidden'}},{T:1,N:'xf:input',A:{adjustMaxLength:'false',id:'resourceCategory',style:'width: 144px;height: 21px;',type:'hidden'}},{T:1,N:'xf:input',A:{adjustMaxLength:'false',id:'resourcePreviewSrc',style:'width: 144px;height: 21px;',type:'hidden'}},{T:1,N:'xf:input',A:{adjustMaxLength:'false',id:'resourceXmlpath',style:'width: 144px;height: 21px;',type:'hidden'}},{T:1,N:'xf:input',A:{adjustMaxLength:'false',id:'resourceIconSrc',style:'width: 144px;height: 21px;',type:'hidden'}},{T:1,N:'xf:group',A:{class:'sc_area',id:'',style:''},E:[{T:1,N:'w2:anchor',A:{class:'btn_snippet',id:'btn_popup',outerDiv:'false',style:'','ev:onclick':'scwin.btn_popup_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'미리보기'}]}]}]}]},{T:1,N:'xf:group',A:{id:'',class:'title_box'},E:[{T:1,N:'w2:anchor',A:{outerDiv:'false',style:'',id:'btn_favorit',class:'btn_snp_favorit','ev:onclick':'scwin.btn_favorit_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'즐겨찾기'}]}]},{T:1,N:'w2:anchor',A:{outerDiv:'false',style:'',id:'resourceTitle'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'01_페이지시작_icon'}]}]}]}]}]}]},{T:1,N:'xf:group',A:{style:'display: none',id:'',class:'designSystem_cont'},E:[{T:1,N:'xf:group',A:{style:'',id:'',class:'designSystem_dfbox'},E:[{T:1,N:'w2:textbox',A:{style:'',id:'',label:'화면시작',class:'designSystem_df_tit'}}]},{T:1,N:'w2:generator',A:{style:'',id:'',class:'designSystem_list',tagname:'ul'},E:[{T:1,N:'xf:group',A:{class:'item',id:'',tagname:'li',style:''},E:[{T:1,N:'xf:group',A:{class:'img_box',id:''},E:[{T:1,N:'xf:image',A:{id:'',src:'/cm/template/snippets/00_화면시작/01_페이지시작_icon.png',style:'',tabIndex:''}},{T:1,N:'xf:group',A:{class:'sc_area',id:'',style:''},E:[{T:1,N:'w2:anchor',A:{class:'btn_snippet',id:'',outerDiv:'false',style:''},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'미리보기'}]}]},{T:1,N:'w2:anchor',A:{class:'btn_snp_favorit',id:'',outerDiv:'false',style:''},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'즐겨찾기'}]}]}]}]},{T:1,N:'w2:anchor',A:{id:'',outerDiv:'false',style:''},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'01_페이지시작_icon'}]}]}]}]}]},{T:1,N:'xf:group',A:{style:'',id:'',class:'designSystem_zoom_box'},E:[{T:1,N:'w2:wframe',A:{style:'',id:'wf_preview'}},{T:1,N:'w2:anchor',A:{outerDiv:'false',style:'',id:'',class:'btn_zoom_close',ref:''},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'Insert Text'}]}]}]},{T:1,N:'xf:group',A:{style:'',id:'',class:'designSystem_dim'}}]}]}]}]})