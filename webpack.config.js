const path = require('path')

module.exports = {
    mode: 'production',

    /*
    webpack がビルドする際に開始点となるjsファイル
      メリット：OSによって異なるパス記号(¥, /)を無視できる
    */
    entry: './src/index.tsx',

    module: {
        /*
        rules.test : '.ts' で終わるファイルに対し
        rules.use : 'ts-loader' を実行
        rules.exclude : 除外
        */
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /worker\.js$/i,
                loader: "worker-loader",
                options: {
                    inline:"no-fallback"
                },
            },
        ],
    },
    /* resolve : モジュールとして解決する拡張子 */
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    output: {
        // filename: '[hash].index.js',

        /* __dirname : Node.js の global変数。ドキュメントパスの絶対参照 */
        /* どのディレクトリ「path:」にどんなファイル「filename:」を出力するか */
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    /* webpack-dev-server の設定 */
    devServer: {
        /* webpack5系は必要な設定。publicがデフォルト。err「Cannot GET/」回避 */
        static :{
            directory: path.join(__dirname, '/dist/')
        },

        /*
        hot : ファイルの更新で自動でブラウザを更新
        open : server起動時にブラウザを開く
        */
        hot: true,
        open: true,
    },
    /* ビルドされた index.js の容量を広げる。warning回避 */
    performance: {
        hints: false,
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000
    }
}
