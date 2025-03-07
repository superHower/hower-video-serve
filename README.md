## 一、项目介绍
- 1、本项目采用`Nest.js`开发。
  - [`github`地址](https://gitee.com/superHower/hower-video-serve)
- 2、管理端采用`vue3`开发。
  - [`github`地址](https://github.com/superHower/hower-video-admin)
- 3、用户C端采用`React`开发。
  - [`github`地址](https://gitee.com/superHower/hower-video-create)

- 4、项目是基于`mysql`数据库，项目中全部采用`typeorm`来操作数据库，弱化了原生`sql`，避免前端的小伙伴没有`sql`基础。
- 5、使用自定义`token`的方式进行登录鉴权，采用自定义装饰器结合守卫来实现对接口鉴权拦截访问。
- 6、自定义装饰器实现对接口权限收集，如果这个接口要给角色分配权限的时候就直接加上装饰器，会自动在数据库生成数据


## 二、使用项目

- 1、本项目仅仅是实现了`rbac`的权限系统，对于其他的功能需要自己基于这个基础上去扩展

- 2、先在本地创建数据库

- 3、在项目的根目录的`.env`文件修改为你自己的数据库基本配置(地址、用户名、密码、数据库)

  ```properties
  DB_HOST=localhost
  DB_USERNAME=root
  DB_PASSWORD=123456
  DB_DATABASE=nestjs-mysql
  ```

- 4、安装依赖包

- 5、启动项目

  ```shell
  npm run start:dev
  ```

- 5、运行项目会自动初始化菜单数据和用户数据(账号:`admin`,密码:123456)

## 二、主要实现功能

- [x] 实现用户的登录、登录鉴权、多点登录限制、菜单权限、接口权限

- [x] 基于`RBAC`实现权限控制

- [x] 集成`swagger`文档

- [x] `ecosystem.config.js`是采用`PM2`的配置文件,项目开发完后直接运行命令一键部署

  ```shell
  npm run build
  # 开发环境
  npm run pm2:dev
  # 生产环境
  npm run pm2:prod
  ```

- [x] `winston`日志系统根据小时来划分日志管理,如果要实时查看日志，直接使用`PM2`查看日志

  ```shell
  pm2 log
  ```

- [x] 自定义装饰器，被装饰器装饰的接口会自动进行入库操作
