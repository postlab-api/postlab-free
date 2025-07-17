## 免费的开源 Api 工具集合
原始项目从知名的开源项目 [hoppscotch](https://github.com/hoppscotch/hoppscotch) 演化而来。hoppscotch 的 MIT License 在 *licenses\hoppscotch\LICENSE* 查看

## 工具集合
工具集暂时合包括 mqtt、rest、socketio、sse、websocket 等五个部分，现阶段已经通过代码的重构重写了大部分服务，改写了整个项目的文件架构。但依然存在大量的冗余以及非常恐怖的无测试（充斥着随处可见的 bug），而我对未来的规划是稳步修复和升级。这个工具包是我的另一个项目的重要组成部分之一，所以总共耗时三个月（2025.5至2025.7），每天工作2~3小时完成前期工作。

后期将此项目拆分为 10 个模块，共最少 5 个免费的三端小工具（linux、mac 以及 windows 端），并有 1 个集成订阅工具（类似 hoppscotch、apifox 等），通过数月的代码逻辑拆解已经完成基础部分工作。

其次就是生产最重要的生成产物，一个专业化 api 请求工具用于我另一个项目的数据源配置工作。这也是我花费近三个月共 300 多小时的工作目的。

## 构建
### 代理
构建过程中因 ZG 特殊国情，需要代理

```PowerShell
$env:all_proxy="socks5://192.168.51.34:1080"
```