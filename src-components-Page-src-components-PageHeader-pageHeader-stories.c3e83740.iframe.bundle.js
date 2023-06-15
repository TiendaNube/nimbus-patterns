"use strict";(self.webpackChunknimbus_patterns=self.webpackChunknimbus_patterns||[]).push([[8023],{"./packages/react/src/components/Page/src/components/PageHeader/pageHeader.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,basic:()=>basic,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _nimbus_ds_components__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@nimbus-ds/components/dist/index.js"),_nimbus_ds_icons__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@nimbus-ds/icons/dist/index.js"),_Page__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/react/src/components/Page/src/Page.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Patterns/Page/Page.Header",component:_Page__WEBPACK_IMPORTED_MODULE_2__.T.Header,argTypes:{children:{control:{disable:!0}},buttonStack:{control:{disable:!0}}},tags:["autodocs"]},basic={args:{title:"Page title",subtitle:"Page subtitle",buttonStack:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_3__.IconButton,{source:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_icons__WEBPACK_IMPORTED_MODULE_4__.ChevronLeftIcon,{}),size:"2rem"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_3__.IconButton,{source:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_icons__WEBPACK_IMPORTED_MODULE_4__.ChevronRightIcon,{}),size:"2rem"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_3__.Button,{children:["Mis aplicaciones",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_3__.Icon,{source:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_icons__WEBPACK_IMPORTED_MODULE_4__.ChevronDownIcon,{})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_3__.Button,{children:["Exportar lista",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_3__.Icon,{source:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_icons__WEBPACK_IMPORTED_MODULE_4__.DownloadIcon,{})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_3__.Button,{appearance:"primary",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_3__.Icon,{color:"neutral-background",source:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_icons__WEBPACK_IMPORTED_MODULE_4__.PlusCircleIcon,{})}),"Agregar orden de compra"]})]}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_3__.Box,{display:"flex",gap:"2",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_3__.Tag,{appearance:"primary",children:"Example tag"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_3__.Tag,{children:"Example tag"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_components__WEBPACK_IMPORTED_MODULE_3__.Alert,{appearance:"warning",title:"Example alert",children:"This is an example Alert component inside the Page Header."})]})}};basic.parameters={...basic.parameters,docs:{...basic.parameters?.docs,source:{originalSource:'{\n  args: {\n    title: "Page title",\n    subtitle: "Page subtitle",\n    buttonStack: <>\n        <IconButton source={<ChevronLeftIcon />} size="2rem" />\n        <IconButton source={<ChevronRightIcon />} size="2rem" />\n        <Button>\n          Mis aplicaciones\n          <Icon source={<ChevronDownIcon />} />\n        </Button>\n        <Button>\n          Exportar lista\n          <Icon source={<DownloadIcon />} />\n        </Button>\n        <Button appearance="primary">\n          <Icon color="neutral-background" source={<PlusCircleIcon />} />\n          Agregar orden de compra\n        </Button>\n      </>,\n    children: <>\n        <Box display="flex" gap="2">\n          <Tag appearance="primary">Example tag</Tag>\n          <Tag>Example tag</Tag>\n        </Box>\n        <Alert appearance="warning" title="Example alert">\n          This is an example Alert component inside the Page Header.\n        </Alert>\n      </>\n  }\n}',...basic.parameters?.docs?.source}}};const __namedExportsOrder=["basic"]},"./packages/react/src/components/Page/src/Page.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>Page});__webpack_require__("./node_modules/react/index.js");var dist=__webpack_require__("./node_modules/@nimbus-ds/components/dist/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const PageHeader=({className:_className,style:_style,title,subtitle,buttonStack,children,...rest})=>(0,jsx_runtime.jsxs)(dist.Box,{as:"header",paddingY:"4",paddingX:"6",display:"flex",flexDirection:"column",gap:"4",...rest,children:[(0,jsx_runtime.jsxs)(dist.Box,{display:"flex",alignItems:"center",gap:"2",children:[(0,jsx_runtime.jsx)(dist.Box,{display:"inline-flex",flex:"1",children:(0,jsx_runtime.jsx)(dist.Title,{as:"h1",children:title})}),buttonStack]}),subtitle&&(0,jsx_runtime.jsx)(dist.Text,{color:"neutral-textHigh",fontSize:"base",children:subtitle}),children]});PageHeader.displayName="PageHeader";try{PageHeader.displayName="PageHeader",PageHeader.__docgenInfo={description:"",displayName:"PageHeader",props:{title:{defaultValue:null,description:"Main title of the page. Corresponds to an h1 HTML tag.",name:"title",required:!1,type:{name:"string"}},subtitle:{defaultValue:null,description:"Optional subtitle for the page.",name:"subtitle",required:!1,type:{name:"string"}},buttonStack:{defaultValue:null,description:"Button stack that appears on the right-hand side of the title.\n@TJS-type React.ReactNode",name:"buttonStack",required:!1,type:{name:"ReactNode"}},children:{defaultValue:null,description:"Optional header content that appears underneath the title and button stack.\nElement to be rendered inside the Box component. Meu teste\n@TJS-type React.ReactNode\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"div"'}]}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/Page/src/components/PageHeader/PageHeader.tsx#PageHeader"]={docgenInfo:PageHeader.__docgenInfo,name:"PageHeader",path:"packages/react/src/components/Page/src/components/PageHeader/PageHeader.tsx#PageHeader"})}catch(__react_docgen_typescript_loader_error){}const PageBody=({className:_className,style:_style,children,...rest})=>(0,jsx_runtime.jsx)(dist.Box,{as:"section",paddingY:"4",paddingX:"6",...rest,children});PageBody.displayName="PageBody";try{PageBody.displayName="PageBody",PageBody.__docgenInfo={description:"",displayName:"PageBody",props:{children:{defaultValue:null,description:"Content of the page body.\nElement to be rendered inside the Box component. Meu teste\n@TJS-type React.ReactNode\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"div"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/Page/src/components/PageBody/PageBody.tsx#PageBody"]={docgenInfo:PageBody.__docgenInfo,name:"PageBody",path:"packages/react/src/components/Page/src/components/PageBody/PageBody.tsx#PageBody"})}catch(__react_docgen_typescript_loader_error){}const Page=({className:_className,style:_style,children,maxWidth="1200px",...rest})=>(0,jsx_runtime.jsx)(dist.Box,{as:"main",...rest,width:"100%",maxWidth,marginX:"auto",children});Page.displayName="Page",Page.Header=PageHeader,Page.Body=PageBody,Page.displayName="Page",Page.Header.displayName="Page.Header",Page.Body.displayName="Page.Body";try{Page.displayName="Page",Page.__docgenInfo={description:"",displayName:"Page",props:{children:{defaultValue:null,description:"Content to be rendered inside the page body.\nElement to be rendered inside the Box component. Meu teste\n@TJS-type React.ReactNode\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}},maxWidth:{defaultValue:{value:"1200px"},description:"Optional parameter to define a maximum width of the page content.",name:"maxWidth",required:!1,type:{name:"string"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"div"'}]}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/Page/src/Page.tsx#Page"]={docgenInfo:Page.__docgenInfo,name:"Page",path:"packages/react/src/components/Page/src/Page.tsx#Page"})}catch(__react_docgen_typescript_loader_error){}}}]);