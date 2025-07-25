## cargo 

重新构建依赖 cargo build

### error

* hangs for "waiting for file lock on build directory"

删除 ~/.cargo/.package-cache 或者 cargo clean

## 在 tauri 中导入插件

* https://github.com/tauri-apps/tauri/discussions/11411

## 测试

```
pnpm tauri dev
```

## 异常
启动异常错误 window Error: listen EACCES: permission denied

* https://stackoverflow.com/questions/48478869/cannot-bind-to-some-ports-due-to-permission-denied