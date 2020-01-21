const packConfig = {
  "pkg/npm.js": [
    "/mod.js",
    "node_modules/**.js",
    "!monaco-editor/**",
    "!flv.js/**",
    "!hls.js/**",
    "!amis/lib/editor/**",
    "!froala-editor/**",
    "!amis/lib/components/RichText.js",
    "!jquery/**",
    "!zrender/**",
    "!echarts/**"
  ],
  "pkg/rich-text.js": [
    "amis/lib/components/RichText.js",
    "froala-editor/**",
    "jquery/**"
  ],
  "pkg/charts.js": ["zrender/**", "echarts/**"],
  "editor.js": [
    "monaco-editor/esm/vs/editor/editor.main.js",
    "monaco-editor/esm/vs/editor/editor.main.js:deps"
  ],

  "pkg/api-mock.js": ["mock/*.ts"],
  "pkg/app.js": ["/index.tsx", "/index.tsx:deps"],
  "pkg/rest.js": [
    "**.{js,jsx,ts,tsx}",
    "!static/mod.js",
    "!monaco-editor/**",
    "!echarts/**",
    "!flv.js/**",
    "!hls.js/**",
    "!froala-editor/**",
    "!jquery/**",
    "!amis/lib/components/RichText.js",
    "!zrender/**",
    "!echarts/**"
  ],
  // css 打包
  "pkg/style.css": [
    "node_modules/*/**.css",
    "*.scss",
    "!/scss/*.scss",
    "/scss/*.scss"
  ]
};

fis.get("project.ignore").push("public/**", "gh-pages/**");

// 配置只编译哪些文件。

fis.set("project.files", ["*.html", "mock/**"]);

fis.match("/mock/**.{json,js,conf}", {
  // isMod: false,
  useCompile: false
});

fis.match("*.scss", {
  parser: fis.plugin("node-sass", {
    sourceMap: true
  }),
  rExt: ".css"
});

fis.match("_*.scss", {
  release: false
});

fis.match("/node_modules/**.js", {
  isMod: true
});

fis.match("*.{jsx,tsx,ts}", {
  parser: [
    fis.plugin("typescript", {
      importHelpers: true,
      experimentalDecorators: true,
      sourceMap: true
    }),

    function(content) {
      return content.replace(/\b[a-zA-Z_0-9$]+\.__uri\s*\(/g, "__uri(");
    }
  ],
  preprocessor: fis.plugin("js-require-css"),
  isMod: true,
  rExt: ".js"
});

// monaco 的 esm 版本，还是 es6 的语法。
fis.match("monaco-editor/esm/**.js", {
  parser: fis.plugin("typescript", {
    importHelpers: true,
    esModuleInterop: true,
    experimentalDecorators: true,
    sourceMap: false
  }),
  preprocessor: fis.plugin("js-require-css")
});

fis.match("*.html:jsx", {
  parser: fis.plugin("typescript"),
  rExt: ".js",
  isMod: false
});

fis.match("::package", {
  prepackager: fis.plugin("stand-alone-pack", {
    "/pkg/editor.worker.js": "monaco-editor/esm/vs/editor/editor.worker.js",
    "/pkg/json.worker.js": "monaco-editor/esm/vs/language/json/json.worker",
    "/pkg/css.worker.js": "monaco-editor/esm/vs/language/css/css.worker",
    "/pkg/html.worker.js": "monaco-editor/esm/vs/language/html/html.worker",
    "/pkg/ts.worker.js": "monaco-editor/esm/vs/language/typescript/ts.worker",

    // 替换这些文件里面的路径引用。
    // 如果不配置，源码中对于打包文件的引用是不正确的。
    replaceFiles: ["amis/lib/components/Editor.js"]
  }),
  postpackager: fis.plugin("loader", {
    useInlineMap: false,
    resourceType: "mod"
  })
});

fis.hook("node_modules", {
  shimProcess: false,
  shimGlobal: false,
  shimBuffer: false
});
fis.hook("commonjs", {
  extList: [".js", ".jsx", ".tsx", ".ts"]
});

fis.media("dev").match("/node_modules/**.js", {
  packTo: "/pkg/npm.js"
});

const ghPages = fis.media("gh-pages");

ghPages.match("/node_modules/(**)", {
  release: "/n/$1"
});

ghPages.match("mock/**.{json,js,conf}", {
  release: false
});

ghPages.match("::package", {
  packager: fis.plugin("deps-pack", packConfig),
  postpackager: [
    fis.plugin("loader", {
      useInlineMap: false,
      resourceType: "mod"
    }),
    function(ret) {
      const indexHtml = ret.src["/index.html"];
      const pages = [
        "login",
        "register",
        "404",
        "admin/dashboard",
        "admin/form/basic",
        "admin/form/advanced",
        "admin/form/wizard",
        "admin/form/editor"
      ];
      const contents = indexHtml.getContent();
      pages.forEach(function(path) {
        const file = fis.file(
          fis.project.getProjectPath(),
          "/" + path + ".html"
        );
        file.setContent(contents);
        ret.pkg[file.getId()] = file;
      });
    }
  ]
});

ghPages.match("*.{css,less,scss}", {
  optimizer: fis.plugin("clean-css"),
  useHash: true
});

ghPages.match("::image", {
  useHash: true
});

ghPages.match("*.{js,ts,tsx}", {
  optimizer: fis.plugin("uglify-js"),
  useHash: true
});

ghPages.match("*.map", {
  release: false,
  url: "null",
  useHash: false
});
ghPages.match("{*.jsx,*.tsx,*.ts}", {
  parser: fis.plugin("typescript", {
    sourceMap: false,
    importHelpers: true
  })
});
ghPages.match("{*.jsx,*.tsx,*.ts,*.js}", {
  moduleId: function(m, path) {
    return fis.util.md5("amis" + path);
  }
});
ghPages.match("*", {
  domain: "https://bce.bdstatic.com/fex/amis-admin-gh-pages",
  deploy: [
    fis.plugin("skip-packed"),
    fis.plugin("local-deliver", {
      to: "./gh-pages"
    })
  ]
});
ghPages.hook("node_modules", {
    shimProcess: false,
    shimGlobal: true,
    shimBuffer: false
  });
