import schema2component from "../../../utils/schema2component";


const schema = {
    type: 'page',
    title: '代码编辑器',
    subTitle: '使用的monaco-editor,用到了 worker, 如果控制台没有报错，说明一起正常。',
    body: [
        {
            type: 'form',
            controls: [
                {
                    type: "editor",
                    name: "js",
                    label: "Javascript",
                    size: "md"
                }
            ]
        }
    ]
};

export default schema2component(schema);