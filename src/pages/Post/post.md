## 文章管理 逻辑 参考稀土掘金

### 新建编辑文章的功能逻辑

- 新建文章第一次输入时 保存至草稿箱 获得草稿文章 id 第二次输入时 根据草稿文章 id 修改该草稿内容 该过程每五秒进行一次

  点击发布 将该草稿转换为正式文章

- 编辑文章如果编辑草稿 每一次输入时 根据草稿文章 id 修改该草稿内容 该过程每五秒进行一次

  点击发布 将该草稿转换为正式文章

  如果编辑正式文章 每一次输入时 根据正式文章 id 修改该正式文章内容 该过程每五秒进行一次

  点击更新 将该草稿转换为正式文章

- 文章编辑
- 文章删除

### 技术点
