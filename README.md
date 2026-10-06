# 我的工作台

一个网页版个人工作台，四个模块分开：存钱、工作、摄影学习、健身。
做成手机 App 的样子，可以添加到手机桌面，点开就用，断网也能开。

数据存在你自己手机的浏览器里（localStorage），不上传任何服务器。

## 电脑上先看效果

直接双击 `index.html` 就能在浏览器里打开。
右上角齿轮里点「填入示例数据」，可以先看看有数据时的样子。

## 部署到手机上

有两种办法：**网页上传**（不用打命令，推荐）和 **git 命令**。选一种就行。

### 办法一：网页上传（推荐，不用命令行）

1. 电脑浏览器打开 https://github.com ，登录你的账号。
2. 右上角 `+` → `New repository`。
3. `Repository name` 填 `workbench`，下面选 **Public**，其它都不要勾，点绿色 `Create repository`。
4. 新页面中间有一行小字 **uploading an existing file**，点进去。
5. 打开文件夹 `D:\apps\CODEX\Documents\学习\workbench`，按 `Ctrl+A` 全选里面的所有东西
   （`index.html`、`manifest.webmanifest`、`sw.js`、`README.md`、`icons`、`preview`），
   一起拖到网页上的虚线框里。
   **注意**：拖的是「文件夹里面的东西」，不要把 `workbench` 文件夹本身拖进去，
   否则网址会多一层。
6. 等文件列表都显示出来，最下面点绿色 `Commit changes`。

### 办法二：git 命令

先在 https://github.com/new 建一个 **Public** 仓库，名字 `workbench`，
不要勾选自动创建 README。然后在电脑上执行：

```powershell
cd D:\apps\CODEX\Documents\学习\workbench
git config --global user.name "你的名字"     # 只需设置一次
git config --global user.email "你的邮箱"     # 只需设置一次
git init -b main
git add .
git commit -m "我的工作台"
git remote add origin https://github.com/你的用户名/workbench.git
git push -u origin main
```

### 最后两步（两种办法都一样）

**打开网站**：仓库上方 `Settings` → 左侧栏往下找 `Pages` →
`Source` 选 `Deploy from a branch` → `Branch` 选 `main`，目录选 `/ (root)` → `Save`。
等一分钟刷新，最上面会出现 `Your site is live at https://你的用户名.github.io/workbench/`。

网址就是：

```
https://你的用户名.github.io/workbench/
```

**装到手机桌面**：手机 Chrome 打开上面的网址 → 右上角菜单 → **添加到主屏幕**。

之后从桌面图标点开，是全屏的独立窗口，没有地址栏；断网也能打开，
因为界面文件已经缓存在手机上了。

## 以后怎么改

改完 `index.html` 后执行：

```powershell
git add .
git commit -m "更新"
git push
```

手机上重新打开一次就会拿到新版本。

## 数据在哪、怎么备份

数据存在手机浏览器里，不上传。所以：

- 换手机、清浏览器数据、换网址（域名变了）都会丢数据
- 重要时用右上角齿轮里的「导出备份」存一个 JSON 文件
- 「导入备份」可以把 JSON 恢复到手机上

## 四个模块说明

**存钱**：自由支配 / 不能动 / 本月零花剩余 / 今日已花四张卡片；
今日预算进度条；支出分类环形图（今日 / 本周 / 本月切换）；
快捷记账（点常用标签 → 输金额 → 记下）；标签可以自己加和删；
账户余额直接点数字改。

**工作**：添加今天的或未来 30 天的安排，勾选完成，随时删除。

**摄影学习**：每天晚上固定 30 分钟。内置计时器，计时结束自动打卡；
也可以直接勾清单。连续打卡天数按「当天计划全部完成」计算；
本周七格进度；每天可写一句笔记。时长和开始时间都能改。

**健身**：今天练哪个部位、做哪些动作，每个动作单独勾选，全部勾完自动算打卡；
每周计划里每天的主题、动作、组次都能改，也能加动作；
按体重身高年龄体脂估算 BMR、TDEE、建议热量与三大营养素。

## 想加功能怎么办

整个应用是一个 `index.html`，数据结构和渲染逻辑都在文件末尾的 `<script>` 里。
新增模块时：在 `defaults()` 里加数据字段，加一个 `renderXxx()`，再在底部导航加一个按钮。
