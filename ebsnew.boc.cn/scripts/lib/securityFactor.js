/*! BUILD: 2015-12-11 */
!function(){"use strict";function a(a){Common.postRequest(new Model("PSNCreatConversation")).then(function(b){e=CU.ajaxDataHandle(b),a&&a()})}var b,c,d={EJS:{SELECTOR:"templates/securityFactor/securityFactorSelector.ejs",INPUT:"templates/securityFactor/securityFactorInput.ejs",caOrNo:"templates/transfersAndRemittances/batchTransferAccount/onlineBatchTransfer/caOrNo.ejs"},MAP:{Smc:32,Otp:8,_signedData:4}},e=null,f=null,g=null,h=null,i=null,j=null;Common.SecurityFactor=Common.SF={showSelector:function(c,h,i,j,k){function l(){Common.postRequest(new Model("PsnGetSecurityFactor",{serviceId:c},e)).then(function(a){var b=CU.ajaxDataHandle(a),c=null,e=null,j=null,l=null;return b?(c=b._defaultCombin,e=b._combinList,j=d.EJS.SELECTOR,l=$(i),g=b._combinList):Common.LightBox.hide(),e&&0!==e.length?(Common.LOGIN_PRE&&k&&(j=k+j),void l.addClass("chose-stool").html("").html(j,{list:e,def:c,pre:Common.LOGIN_PRE},function(){c&&(l.find("input[value="+c.id+"]").attr("checked",!0).attr("defaultfactor",1),f=c.id),l.on("change","input[name=rd_choose_security_tool_17637]",function(){f=$(this).val()}),l.on("click","#goto_sec_setting",function(){Common.LightBox.hide(),Common.triggerAction("SecurityToolsSetting")}),CU.changeLan(l),h&&h()})):(Common.LightBox.showMessage(CU.getDictNameByKey("l8969")),h&&1===h.length&&h(!1),!1)})}f=null,i||(i="#stool-selector"),b=i,j?(e=j,l()):a(l)},appendInputTo:function(a,b,g,k,l,m,n){var o=d.EJS.INPUT;j=null,m||(m="PsnSendSMSCodeToMobile"),n&&(e=n),g.factorList&&!function(){f=0;var a,b,c;for(a=0,b=g.factorList.length;b>a;a++)c=g.factorList[a].field.name,f|=d.MAP[c]}(),$(a).find(".sf-list-item").remove(),Common.LOGIN_PRE&&l&&(o=l+o),$(a).append(o,{combinId:f},function(){k?($("#txt_inputdealcode_18055").sec({mode:3,RandomKey_S:k,width:60}),$("#txt_dynamiccommand_18060").sec({mode:2,RandomKey_S:k,width:60})):Common.postRequest(new Model("PSNGetRandom",e)).then(function(a){var b=CU.ajaxDataHandle(a);$("#txt_inputdealcode_18055").sec({mode:3,RandomKey_S:b,width:60}),$("#txt_dynamiccommand_18060").sec({mode:2,RandomKey_S:b,width:60})}),$("#SignerContainer").size()>0&&g._plainData&&g._certDN&&(h=g._plainData,i=g._certDN,Common.Signer.init({container:$("#SignerContainer")}),setTimeout(function(){Common.LightBox.showMessage(CU.getDictNameByKey("l8970"))},200)),$(a).off("click","#btn_getdealcode_18056").on("click","#btn_getdealcode_18056",function(){$("#txt_inputdealcode_18055").sec("Clear"),Common.postRequest(new Model(m,e)).then(function(a){if(CU.ajaxDataHandle(a),CU.isSuccesful(a)){$("#code_cd").show();var b=60;c&&clearInterval(c),c=setInterval(function(){b-=1,0>=b?Common.SF.clearTimer():$("#code_sec").size()>0?$("#code_sec").text(b):Common.SF.clearTimer()},1e3),$("#code_sec").text(b),$("#btn_getdealcode_18056").hide()}})}),b&&b()})},get:function(a){var b,c={Smc:"#txt_inputdealcode_18055",Otp:"#txt_dynamiccommand_18060",combinId:f+"",_combinId:f+"",conversationId:e,_combinList:g,_signedData:j,signedData:j};return a?"Smc"===a||"Otp"===a?(b=$(c[a]),b.size()>0?(Common.secVersion=b.sec("Version")+"",{Version:b.sec("Version"),State:b.sec("State"),Value:b.sec("Value"),RandomKey_C:b.sec("RandomKey_C")}):null):"_signedData"===a||"signedData"===a?($("#SignerContainer").size()>0&&(j=Common.Signer.doDetachSign(i,null,h)),j):c[a]:c},getData:function(a){var b,c=this,d=null,e="",g=[];switch(f.toString()){case"4":e="_signedData";break;case"8":e="Otp";break;case"32":e="Smc";break;case"40":e="Smc,Otp"}return g=e.split(","),$.each(g,function(e,f){switch(d=c.get(f),f){case"Smc":case"Otp":d&&(Common.secVersion=d.Version+"",$.extend(a,{activ:d.Version,state:d.State}),a[f]=d.Value,a[f+"_RC"]=d.RandomKey_C);break;case"_signedData":if(d){if(!d.result)return b=!0,!1;$.extend(a,{_signedData:d.result})}}}),b?!1:a},reset:function(){var a=$("input[defaultfactor]");a.size()>0?(a.attr("checked",!0),f=a.val()):($(b+" input[type=radio]").attr("checked",!1),f=null)},check:function(){return f||0!==$("input[name=rd_choose_security_tool_17637]:checked").size()?(f=$("input[name=rd_choose_security_tool_17637]:checked").val(),!0):(Common.LightBox.showMessage(CU.getDictNameByKey("l0325")),!1)},clear:function(){$("#txt_inputdealcode_18055,#txt_dynamiccommand_18060").sec("Clear"),Common.SF.clearTimer()},clearTimer:function(){clearInterval(c),$("#code_sec").size()>0&&($("#btn_getdealcode_18056").show(),$("#code_cd").hide())},isHasSelector:function(a,b,c,e){Common.LightBox.show(),Common.postRequest(new Model("PsnGetSecurityFactor",{serviceId:b},c)).then(function(b){b.response[0].error&&"SafetyCombin.noSafetyCombins"==b.response[0].error.code?a.el.append(d.EJS.caOrNo,function(){var b=a.el.find("#caorno");$("#caorno_btn,a.close").on("click",function(){b.remove(),Common.LightBox.hide()}),CU.changeLan(b),CU.setObjAbsCenter(b)}):CU.isSuccesful(b)?e&&e():(CU.ajaxDataHandle(b),Common.LightBox.hide())})}}}();