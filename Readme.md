# 报修平台管理系统后端

接入项目：
```bash
    yarn install
    yarn global add nodemon ts-node typescript # 安装ts node环境
    yarn global add prisma # 安装prisma
    yarn add @prisma/client # 安装prisma client
    npx prisma db pull
    npx prisma generate
    # nodemon index.ts
    yarn dev
```

## 项目规范
* 数据库字段
  * 下划线命名 