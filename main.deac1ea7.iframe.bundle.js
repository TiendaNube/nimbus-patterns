(self.webpackChunknimbus_patterns=self.webpackChunknimbus_patterns||[]).push([[179],{"./.storybook/preview.js-generated-config-entry.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";var preview_namespaceObject={};__webpack_require__.r(preview_namespaceObject),__webpack_require__.d(preview_namespaceObject,{__namedExportsOrder:()=>__namedExportsOrder,parameters:()=>parameters});__webpack_require__("./node_modules/core-js/modules/es.object.keys.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),__webpack_require__("./node_modules/core-js/modules/es.array.filter.js"),__webpack_require__("./node_modules/core-js/modules/es.object.get-own-property-descriptor.js"),__webpack_require__("./node_modules/core-js/modules/es.array.for-each.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.for-each.js"),__webpack_require__("./node_modules/core-js/modules/es.object.get-own-property-descriptors.js"),__webpack_require__("./node_modules/core-js/modules/es.object.define-properties.js"),__webpack_require__("./node_modules/core-js/modules/es.object.define-property.js");var ClientApi=__webpack_require__("./node_modules/@storybook/client-api/dist/esm/ClientApi.js"),parameters={actions:{argTypesRegex:"^on[A-Z].*"},controls:{matchers:{color:/(background|color)$/i,date:/Date$/}}},__namedExportsOrder=["parameters"];function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.keys(preview_namespaceObject).forEach((function(key){var value=preview_namespaceObject[key];switch(key){case"args":return(0,ClientApi.uc)(value);case"argTypes":return(0,ClientApi.v9)(value);case"decorators":return value.forEach((function(decorator){return(0,ClientApi.$9)(decorator,!1)}));case"loaders":return value.forEach((function(loader){return(0,ClientApi.HZ)(loader,!1)}));case"parameters":return(0,ClientApi.h1)(function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({},value),!1);case"argTypesEnhancers":return value.forEach((function(enhancer){return(0,ClientApi.My)(enhancer)}));case"argsEnhancers":return value.forEach((function(enhancer){return(0,ClientApi._C)(enhancer)}));case"render":return(0,ClientApi.$P)(value);case"globals":case"globalTypes":var v={};return v[key]=value,(0,ClientApi.h1)(v,!1);case"__namedExportsOrder":case"decorateStory":case"renderToDOM":return null;default:return console.log(key+" was not supported :( !")}}))},"./packages/react/CalloutCard/src/calloutCard.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,base:()=>base,danger:()=>danger,default:()=>calloutCard_stories,neutral:()=>neutral,primary:()=>primary,success:()=>success,warning:()=>warning});__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),__webpack_require__("./node_modules/core-js/modules/es.function.bind.js"),__webpack_require__("./node_modules/react/index.js");var esm=__webpack_require__("./node_modules/@storybook/addon-a11y/dist/esm/index.js"),index_esm=__webpack_require__("./node_modules/@tiendanube/icons/dist/index.esm.js"),dist=(__webpack_require__("./node_modules/core-js/modules/es.object.keys.js"),__webpack_require__("./node_modules/core-js/modules/es.array.index-of.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),__webpack_require__("./node_modules/core-js/modules/es.string.link.js"),__webpack_require__("./node_modules/@nimbus-ds/card/dist/index.js")),box_dist=__webpack_require__("./node_modules/@nimbus-ds/box/dist/index.js"),stack_dist=__webpack_require__("./node_modules/@nimbus-ds/stack/dist/index.js"),icon_dist=__webpack_require__("./node_modules/@nimbus-ds/icon/dist/index.js"),text_dist=__webpack_require__("./node_modules/@nimbus-ds/text/dist/index.js"),link_dist=__webpack_require__("./node_modules/@nimbus-ds/link/dist/index.js"),cardBackground={primary:"primary.surfaceHighlight",success:"success.surfaceHighlight",warning:"warning.surfaceHighlight",danger:"danger.surfaceHighlight",neutral:"neutral.surfaceHighlight"},iconBackground={primary:"primary.surface",success:"success.surface",warning:"warning.surface",danger:"danger.surface",neutral:"neutral.surface"},iconColor={primary:"primary.textLow",success:"success.textLow",warning:"warning.textLow",danger:"danger.textLow",neutral:"neutral.textLow"},textColor=iconColor,jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),_excluded=["appearance","title","subtitle","link","onClick","icon"];function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}var CalloutCard=function CalloutCard(_ref){var appearance=_ref.appearance,title=_ref.title,subtitle=_ref.subtitle,link=_ref.link,onClick=_ref.onClick,Source=_ref.icon,rest=_objectWithoutProperties(_ref,_excluded);return(0,jsx_runtime.jsx)(dist.Card,Object.assign({backgroundColor:cardBackground[appearance]},rest,{children:(0,jsx_runtime.jsxs)(stack_dist.Stack,{display:"flex",justifyContent:"space-between",gap:"1,5",children:[(0,jsx_runtime.jsxs)(stack_dist.Stack,{display:"flex",gap:"1,5",children:[(0,jsx_runtime.jsx)(box_dist.Box,{backgroundColor:iconBackground[appearance],height:"36px",width:"36px",borderRadius:"8px",children:(0,jsx_runtime.jsx)(stack_dist.Stack,{display:"flex",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",children:(0,jsx_runtime.jsx)(icon_dist.Icon,{"data-testid":"callout-card-icon",color:iconColor[appearance],source:(0,jsx_runtime.jsx)(Source,{size:"medium"})})})}),(0,jsx_runtime.jsxs)(stack_dist.Stack,{display:"flex",flexDirection:"column",children:[(0,jsx_runtime.jsx)(text_dist.Text,{"data-testid":"callout-card-title",color:textColor[appearance],fontSize:"caption",lineHeight:"base",fontWeight:"bold",children:title}),(0,jsx_runtime.jsx)(text_dist.Text,{"data-testid":"callout-card-subtitle",color:textColor[appearance],fontSize:"caption",children:subtitle}),link&&(0,jsx_runtime.jsx)(box_dist.Box,{mt:"2",children:(0,jsx_runtime.jsx)(link_dist.Link,Object.assign({},link,{appearance:"primary"}))})]})]}),!link&&(0,jsx_runtime.jsx)(icon_dist.Icon,{"data-testid":"callout-card-open-icon",cursor:"pointer",onClick,color:iconColor[appearance],source:(0,jsx_runtime.jsx)(index_esm.XC,{size:"small"})})]})}))};CalloutCard.displayName="CalloutCard",CalloutCard.displayName="CalloutCard";try{CalloutCard.displayName="CalloutCard",CalloutCard.__docgenInfo={description:"",displayName:"CalloutCard",props:{appearance:{defaultValue:null,description:"CalloutCard color",name:"appearance",required:!0,type:{name:"enum",value:[{value:'"primary"'},{value:'"success"'},{value:'"warning"'},{value:'"danger"'},{value:'"neutral"'}]}},icon:{defaultValue:null,description:"Icon SVG",name:"icon",required:!0,type:{name:"Icon"}},title:{defaultValue:null,description:"Title",name:"title",required:!0,type:{name:"string"}},subtitle:{defaultValue:null,description:"Subtitle",name:"subtitle",required:!0,type:{name:"string"}},link:{defaultValue:null,description:"Subtitle",name:"link",required:!1,type:{name:"LinkProps"}},onClick:{defaultValue:null,description:"Event fired when clicking the component",name:"onClick",required:!1,type:{name:"MouseEventHandler<HTMLElement>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/CalloutCard/src/CalloutCard.tsx#CalloutCard"]={docgenInfo:CalloutCard.__docgenInfo,name:"CalloutCard",path:"packages/react/CalloutCard/src/CalloutCard.tsx#CalloutCard"})}catch(__react_docgen_typescript_loader_error){}const calloutCard_stories={title:"Patterns/CalloutCard",component:CalloutCard,parameters:{withA11y:{decorators:[esm.VO]}},argTypes:{onClick:{control:{disable:!0}},icon:{control:{disable:!0}}}};var Template=function Template(args){return(0,jsx_runtime.jsx)(CalloutCard,Object.assign({},args))};Template.displayName="Template";var base=Template.bind({});base.args={appearance:"neutral",title:"Title",subtitle:"Description",icon:index_esm.d$,link:{children:"Link",target:"_blank",href:"https://nimbus.nuvemshop.com.br/"}};var neutral=Template.bind({});neutral.args={appearance:"neutral",title:"Title",subtitle:"Description",icon:index_esm.d$};var primary=Template.bind({});primary.args={appearance:"primary",title:"Title",subtitle:"Description",icon:index_esm.d$};var success=Template.bind({});success.args={appearance:"success",title:"Title",subtitle:"Description",icon:index_esm.d$};var warning=Template.bind({});warning.args={appearance:"warning",title:"Title",subtitle:"Description",icon:index_esm.d$};var danger=Template.bind({});danger.args={appearance:"danger",title:"Title",subtitle:"Description",icon:index_esm.d$,onClick:function onClick(){return console.log("adasda")}},base.parameters=Object.assign({storySource:{source:"(args) => (\n  <CalloutCard {...args} />\n)"}},base.parameters),neutral.parameters=Object.assign({storySource:{source:"(args) => (\n  <CalloutCard {...args} />\n)"}},neutral.parameters),primary.parameters=Object.assign({storySource:{source:"(args) => (\n  <CalloutCard {...args} />\n)"}},primary.parameters),success.parameters=Object.assign({storySource:{source:"(args) => (\n  <CalloutCard {...args} />\n)"}},success.parameters),warning.parameters=Object.assign({storySource:{source:"(args) => (\n  <CalloutCard {...args} />\n)"}},warning.parameters),danger.parameters=Object.assign({storySource:{source:"(args) => (\n  <CalloutCard {...args} />\n)"}},danger.parameters);var __namedExportsOrder=["base","neutral","primary","success","warning","danger"]},"./storybook-init-framework-entry.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__("./node_modules/@storybook/react/dist/esm/client/index.js")},"./packages/react sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$":(module,__unused_webpack_exports,__webpack_require__)=>{var map={"./CalloutCard/src/calloutCard.stories.tsx":"./packages/react/CalloutCard/src/calloutCard.stories.tsx"};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id="./packages/react sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$"},"./packages/react sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./packages/react sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$",module.exports=webpackEmptyContext},"?4f7e":()=>{},"./generated-stories-entry.cjs":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module=__webpack_require__.nmd(module),(0,__webpack_require__("./node_modules/@storybook/react/dist/esm/client/index.js").configure)([__webpack_require__("./packages/react sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$"),__webpack_require__("./packages/react sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$")],module,!1)}},__webpack_require__=>{var __webpack_exec__=moduleId=>__webpack_require__(__webpack_require__.s=moduleId);__webpack_require__.O(0,[920],(()=>(__webpack_exec__("./node_modules/@storybook/core-client/dist/esm/globals/polyfills.js"),__webpack_exec__("./node_modules/@storybook/core-client/dist/esm/globals/globals.js"),__webpack_exec__("./storybook-init-framework-entry.js"),__webpack_exec__("./node_modules/@storybook/react/dist/esm/client/docs/config-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/react/dist/esm/client/preview/config-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-links/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-docs/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-actions/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-backgrounds/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-measure/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-outline/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-interactions/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-a11y/preview.js-generated-config-entry.js"),__webpack_exec__("./.storybook/preview.js-generated-config-entry.js"),__webpack_exec__("./generated-stories-entry.cjs"))));__webpack_require__.O()}]);