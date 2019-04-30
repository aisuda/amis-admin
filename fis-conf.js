fis.get('project.ignore').push(
    'public/**'
);

// 配置只编译哪些文件。

fis.set('project.files', [
    '*.html',
    'mock/**'
]);

fis.match('/mock/**', {
    useCompile: false
});

fis.match('*.scss', {
    parser: fis.plugin('node-sass', {
        sourceMap: true
    }),
    rExt: '.css'
});

fis.match('_*.scss', {
    release: false
});

fis.match('/node_modules/**.js', {
    isMod: true
});

fis.match('{*.jsx,*.tsx,*.ts}', {
    parser: [fis.plugin('typescript', {
        importHelpers: true,
        experimentalDecorators: true,
        sourceMap: true
    }),

    function (content) {
        return content.replace(/\b[a-zA-Z_0-9$]+\.__uri\s*\(/g, '__uri(')
    }],
    preprocessor: fis.plugin('js-require-css'),
    isMod: true,
    rExt: '.js'
});

fis.match('*.html:jsx', {
    parser: fis.plugin('typescript'),
    rExt: '.js',
    isMod: false
});

fis.match('monaco-editor/**.js', {
    isMod: false,
    standard: null
});

fis.match('/node_modules/monaco-editor/min/(**)', {
    standard: false,
    isMod: false,
    packTo: null,
    optimizer: false,
    postprocessor: function (content, file) {
        if (!file.isJsLike || /worker/.test(file.basename)) {
            return content;
        }

        content = content.replace(/\bself\.require\b/g, 'require || self.require');

        return '(function(define, require) {\n' + content
        + '\n})(this.monacaAmd && this.monacaAmd.define || this.define, this.monacaAmd && this.monacaAmd.require);';
    }
});
fis.match('/node_modules/monaco-editor/min/**/loader.js', {
    postprocessor: function (content) {
        return '(function(self) {\n' + content + '\n}).call(this.monacaAmd || (this.monacaAmd = {}));';
    }
});

fis.match('::package', {
    postpackager: fis.plugin('loader', {
        useInlineMap: false,
        resourceType: 'mod'
    })
});

fis.hook('node_modules', {
    shimProcess: false,
    shimGlobal: false,
    shimBuffer: false
});
fis.hook('commonjs', {
    extList: ['.js', '.jsx', '.tsx', '.ts']
});

fis
    .media('dev')
    .match('/node_modules/**.js', {
        packTo: '/pkg/npm.js'
    })
    .match('monaco-editor/**.js', {
        packTo: null
    });

