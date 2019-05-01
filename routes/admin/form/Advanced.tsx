import schema2component from "../../../utils/schema2component";


const schema = {
    type: 'page',
    title: '复杂表单',
    subTitle: '展示表格编辑、联动等等',
    body: [
        {
            type: 'form',
            mode: 'horizontal',
            title: '',
            affixFooter: true,
            api: '/api/form/save',
            actions: [
                {
                    label: '保存',
                    type: 'submit',
                    level: 'success'
                }
            ],
            controls: [
                {
                    type: 'fieldSet',
                    title: '基本配置',
                    controls: [
                        {
                            type: 'text',
                            label: '任务名称',
                            name: 'title',
                            size: 'md',
                            required: true
                        },

                        {
                            type: 'textarea',
                            label: '任务描述',
                            name: 'description',
                            size: 'md'
                        },

                        {
                            label: '任务频率',
                            type: 'radios',
                            name: 'repeat',
                            inline: true,
                            value: 'none',
                            required: true,
                            options: [
                                {
                                    label: '不重复',
                                    value: 'none'
                                },

                                {
                                    label: '每天',
                                    value: 'day'
                                },
        
                                {
                                    label: '每周',
                                    value: 'week'
                                },
        
                                {
                                    label: '每月',
                                    value: 'month'
                                }
                            ]
                        },

                        {
                            label: '每天几点',
                            type: 'select',
                            name: 'time',
                            multiple: true,
                            required: true,
                            extractValue: true,
                            visibleOn: 'this.repeat == "day"',
                            inline: true,
                            options: Array.from({length: 24}, (v, index) => ({
                                value: index,
                                label: `${index}:00`
                            }))
                        },

                        {
                            label: '每周几执行',
                            type: 'button-group',
                            name: 'weekdays',
                            size: 'md',
                            visibleOn: 'this.repeat == "week"',
                            clearable: true,
                            multiple: true,
                            required: true,
                            extractValue: true,
                            maxLength: 7,
                            options: [
                                {
                                    label: '周一',
                                    value: '0'
                                },
        
                                {
                                    label: '周二',
                                    value: '1'
                                },
        
                                {
                                    label: '周三',
                                    value: '2'
                                },
        
                                {
                                    label: '周四',
                                    value: '3'
                                },
        
                                {
                                    label: '周五',
                                    value: '4'
                                },
                                
                                {
                                    label: '周六',
                                    value: '5'
                                },
                                
                                {
                                    label: '周日',
                                    value: '6'
                                },
                            ]
                        },

                        {
                            label: '每月几号执行',
                            type: 'list',
                            name: 'monthday',
                            size: 'md',
                            visibleOn: 'this.repeat == "month"',
                            required: true,
                            maxLength: 31,
                            clearable: true,
                            multiple: true,
                            extractValue: true,
                            options: Array.from({length: 31}, (v, index) => ({
                                value: index,
                                label: `${((index + 1)/100).toFixed(2)}`.substr(-2)
                            }))
                        },
                    ]
                },

                {
                    type: 'fieldSet',
                    title: '其他信息',
                    collapsable: true,
                    controls: [
                        {
                            type: 'combo',
                            name: 'admins',
                            label: '用户列表',
                            value: [''],
                            description: '请输入用户信息，不要重复。',
                            multiple: true,
                            inline: true,
                            controls: [
                                {
                                    type: 'text',
                                    name: 'name',
                                    unique: true
                                },

                                {
                                    type: 'select',
                                    name: 'perm',
                                    value: 'read',
                                    options: [
                                        {
                                            label: '可读',
                                            value: 'read'
                                        },

                                        {
                                            label: '可写',
                                            value: 'write'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: '新增一行',
                            type: 'button',
                            actionType: 'add',
                            target: 'thetable',
                            level: 'info'
                        },
                        {
                            name: 'thetable',
                            type: 'table',
                            label: '任务参数',
                            editable: true,
                            addable: true,
                            removable: true,
                            columns: [
                                {
                                    label: '参数名',
                                    name: 'key',
                                    quickEdit: true
                                },

                                {
                                    label: '参数值',
                                    name: 'value',
                                    quickEdit: true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

export default schema2component(schema);