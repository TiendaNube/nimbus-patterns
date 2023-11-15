"use strict";(self.webpackChunknimbus_patterns=self.webpackChunknimbus_patterns||[]).push([[6862],{"./packages/react/src/components/FormField/src/components/FormFieldTextarea/formFieldTextarea.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,basic:()=>basic,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _nimbus_ds_icons__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@nimbus-ds/icons/dist/index.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Patterns/FormField/FormField.Textarea",component:__webpack_require__("./packages/react/src/components/FormField/src/FormField.tsx").W.Textarea,argTypes:{helpIcon:{control:{disable:!0}},showHelpText:{defaultValue:!1}},tags:["autodocs"]},basic={args:{placeholder:"Placeholder",label:"Label text",helpText:"Help text",helpIcon:_nimbus_ds_icons__WEBPACK_IMPORTED_MODULE_1__.ExclamationCircleIcon}};basic.parameters={...basic.parameters,docs:{...basic.parameters?.docs,source:{originalSource:'{\n  args: {\n    placeholder: "Placeholder",\n    label: "Label text",\n    helpText: "Help text",\n    helpIcon: ExclamationCircleIcon\n  }\n}',...basic.parameters?.docs?.source}}};const __namedExportsOrder=["basic"]},"./packages/react/src/components/FormField/src/FormField.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>FormField});__webpack_require__("./node_modules/react/index.js");var dist=__webpack_require__("./node_modules/@nimbus-ds/components/dist/index.js");const inputAppearance={danger:"danger",warning:"warning",success:"success",none:"neutral"},helpTextAppearance={danger:"danger-textLow",warning:"warning-textLow",success:"success-textLow",none:"neutral-textDisabled"};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const FormFieldSelect=({label,helpText,helpIcon:IconSrc,appearance="none",showHelpText=!1,...rest})=>(0,jsx_runtime.jsx)(FormField,{label,helpText,helpIcon:IconSrc,appearance,showHelpText,id:rest.id,children:(0,jsx_runtime.jsx)(dist.Select,{...rest,appearance:inputAppearance[appearance]})});FormFieldSelect.displayName="FormFieldSelect";try{FormFieldSelect.displayName="FormFieldSelect",FormFieldSelect.__docgenInfo={description:"",displayName:"FormFieldSelect",props:{label:{defaultValue:null,description:"Optional label for the field component.\n@TJS-type React.ReactNode",name:"label",required:!1,type:{name:"ReactNode"}},appearance:{defaultValue:{value:"none"},description:"Appearance of the field and help text elements.",name:"appearance",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"danger"'},{value:'"warning"'},{value:'"success"'}]}},helpText:{defaultValue:null,description:"Help text displaying optional hints or validation messages under the field.",name:"helpText",required:!1,type:{name:"string"}},helpIcon:{defaultValue:null,description:"Icon supporting the help text message.\n@TJS-type React.FC<IconProps>",name:"helpIcon",required:!1,type:{name:"FC<IconProps>"}},showHelpText:{defaultValue:{value:"false"},description:"Control to conditionally show the help text and icon.",name:"showHelpText",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/FormField/src/components/FormFieldSelect/FormFieldSelect.tsx#FormFieldSelect"]={docgenInfo:FormFieldSelect.__docgenInfo,name:"FormFieldSelect",path:"packages/react/src/components/FormField/src/components/FormFieldSelect/FormFieldSelect.tsx#FormFieldSelect"})}catch(__react_docgen_typescript_loader_error){}const FormFieldTextarea=({label,helpText,helpIcon:IconSrc,appearance="none",showHelpText=!1,...rest})=>(0,jsx_runtime.jsx)(FormField,{label,helpText,helpIcon:IconSrc,appearance,showHelpText,id:rest.id,children:(0,jsx_runtime.jsx)(dist.Textarea,{...rest,appearance:inputAppearance[appearance]})});FormFieldTextarea.displayName="FormFieldTextarea";try{FormFieldTextarea.displayName="FormFieldTextarea",FormFieldTextarea.__docgenInfo={description:"",displayName:"FormFieldTextarea",props:{label:{defaultValue:null,description:"Optional label for the field component.\n@TJS-type React.ReactNode",name:"label",required:!1,type:{name:"ReactNode"}},appearance:{defaultValue:{value:"none"},description:"Appearance of the field and help text elements.",name:"appearance",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"danger"'},{value:'"warning"'},{value:'"success"'}]}},helpText:{defaultValue:null,description:"Help text displaying optional hints or validation messages under the field.",name:"helpText",required:!1,type:{name:"string"}},helpIcon:{defaultValue:null,description:"Icon supporting the help text message.\n@TJS-type React.FC<IconProps>",name:"helpIcon",required:!1,type:{name:"FC<IconProps>"}},showHelpText:{defaultValue:{value:"false"},description:"Control to conditionally show the help text and icon.",name:"showHelpText",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/FormField/src/components/FormFieldTextarea/FormFieldTextarea.tsx#FormFieldTextarea"]={docgenInfo:FormFieldTextarea.__docgenInfo,name:"FormFieldTextarea",path:"packages/react/src/components/FormField/src/components/FormFieldTextarea/FormFieldTextarea.tsx#FormFieldTextarea"})}catch(__react_docgen_typescript_loader_error){}const FormFieldInput=({label,helpText,helpIcon:IconSrc,appearance="none",showHelpText=!1,...rest})=>(0,jsx_runtime.jsx)(FormField,{label,helpText,helpIcon:IconSrc,appearance,showHelpText,id:rest.id,children:(0,jsx_runtime.jsx)(dist.Input,{...rest,appearance:inputAppearance[appearance]})});FormFieldInput.displayName="FormFieldInput";try{FormFieldInput.displayName="FormFieldInput",FormFieldInput.__docgenInfo={description:"",displayName:"FormFieldInput",props:{label:{defaultValue:null,description:"Optional label for the field component.\n@TJS-type React.ReactNode",name:"label",required:!1,type:{name:"ReactNode"}},appearance:{defaultValue:{value:"none"},description:"Appearance of the field and help text elements.",name:"appearance",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"danger"'},{value:'"warning"'},{value:'"success"'}]}},helpText:{defaultValue:null,description:"Help text displaying optional hints or validation messages under the field.",name:"helpText",required:!1,type:{name:"string"}},helpIcon:{defaultValue:null,description:"Icon supporting the help text message.\n@TJS-type React.FC<IconProps>",name:"helpIcon",required:!1,type:{name:"FC<IconProps>"}},showHelpText:{defaultValue:{value:"false"},description:"Control to conditionally show the help text and icon.",name:"showHelpText",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/FormField/src/components/FormFieldInput/FormFieldInput.tsx#FormFieldInput"]={docgenInfo:FormFieldInput.__docgenInfo,name:"FormFieldInput",path:"packages/react/src/components/FormField/src/components/FormFieldInput/FormFieldInput.tsx#FormFieldInput"})}catch(__react_docgen_typescript_loader_error){}const FormField=({label,helpText,helpIcon:IconSrc,appearance="none",showHelpText=!1,children,...rest})=>(0,jsx_runtime.jsxs)(dist.Box,{display:"flex",flexDirection:"column",gap:"2",width:"100%",children:[label&&(0,jsx_runtime.jsx)(dist.Label,{htmlFor:rest.id,children:label}),children,showHelpText&&(0,jsx_runtime.jsxs)(dist.Box,{display:"inline-flex",gap:"1",children:[IconSrc&&(0,jsx_runtime.jsx)(dist.Icon,{color:helpTextAppearance[appearance],source:(0,jsx_runtime.jsx)(IconSrc,{size:12})}),helpText&&(0,jsx_runtime.jsx)(dist.Text,{color:helpTextAppearance[appearance],fontSize:"caption",children:helpText})]})]});FormField.displayName="FormField",FormField.displayName="FormField",FormField.Select=FormFieldSelect,FormField.Textarea=FormFieldTextarea,FormField.Input=FormFieldInput,FormField.Select.displayName="FormField.Select",FormField.Textarea.displayName="FormField.Textarea",FormField.Input.displayName="FormField.Input";try{FormField.displayName="FormField",FormField.__docgenInfo={description:"",displayName:"FormField",props:{label:{defaultValue:null,description:"Optional label for the field component.\n@TJS-type React.ReactNode",name:"label",required:!1,type:{name:"ReactNode"}},helpText:{defaultValue:null,description:"Help text displaying optional hints or validation messages under the field.",name:"helpText",required:!1,type:{name:"string"}},helpIcon:{defaultValue:null,description:"Icon supporting the help text message.\n@TJS-type React.FC<IconProps>",name:"helpIcon",required:!1,type:{name:"FC<IconProps>"}},appearance:{defaultValue:{value:"none"},description:"Appearance of the field and help text elements.",name:"appearance",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"danger"'},{value:'"warning"'},{value:'"success"'}]}},showHelpText:{defaultValue:{value:"false"},description:"Control to conditionally show the help text and icon.",name:"showHelpText",required:!1,type:{name:"boolean"}},children:{defaultValue:null,description:"Content of the field.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/components/FormField/src/FormField.tsx#FormField"]={docgenInfo:FormField.__docgenInfo,name:"FormField",path:"packages/react/src/components/FormField/src/FormField.tsx#FormField"})}catch(__react_docgen_typescript_loader_error){}}}]);