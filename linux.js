/*
* 1.目录
*   /           系统根目录
*   /etc        存放所有的系统管理需要的配置文件和子目录
*   /sbin       存放（超级用户）使用的系统管理程序
*   /user/sbin  存放（超级用户）使用的比较高级的管理程序和系统守护程序
*   /bin        存放（系统用户）最经常使用的命令
*   /usr/bin    存放（系统用户）使用的命令
*   /var
* 2.文件基本属性
*   ls -l (ll)    显示文件的属性以及文件所属的用户和组
*   (1)第一个字符：代表这个文件是目录、文件或链接文件等
*     [d]  目录
*     [-]  文件
*     [l]  链接文档
*     [b]  为装置文件里面的可供存储的接口设备
*     [c]  为装置文件里面的船型接口设备，如键盘、鼠标等
*   (2)接下来的字符中，以三个为一组，且均为『rwx』 的三个参数的组合，这三个权限的位置不会改变，如果没有权限，就会出现减号[ - ]
*     [r]  可读
*     [w]  可写
*     [x]  可执行
*   (3)更改文件属性
*     chgrp [-R] 属组名 文件名              更改文件属组（-R表示递归更改文件属组）
*     chown [-R] 属主名[:属组名] 文件名     更改文件属主，也可以同时更改文件属组
*     chmod [-R] xyz 文件或目录             （r:4,w:2,x；1，x|y|z为这3个数字的和）
*     chmod  a-x 文件或目录                 （u[user],g[group],o[other]代表3种身份的权限，a代表all）
*     chmod [-R] u=rwx,g=rx,o=r 文件或目录  更改文件的9个属性
* */

/*
文件与目录管理
* 1.路径
*   绝对路径：路径的写法由/开始
*   相对路径：路径的写法由.会..开始
* 2.常用命令
*   ls [-adl] 目录名称         列出目录（-a为全部文件，包含隐藏文件；-d为仅列出目录本身，而不是列出目录内的文件数据；-l为场数据串列出，包含文件的属性和权限数据）
*   cd [路径]                  切换目录
*   pwd [-P]                   显示当前目录(-P为显示出真实路径，而不是使用链接路径)
*   mkdir [-mp] [xyz有-m选项的时候必须]  目录名        创建一个新目录（-m为配置文件权限，-p为把你将所需要的目录递归的创建起来）
*   rmdir [-p] 目录名                                  删除一个空目录（-p为连同上一级[空的]目录也一起删除）
*   cp [-adfilprsu]  来源档 目标档                     复制文件或目录（-d：若来源档是连接档属性，复制连接档属性而非文件本身；-i：若目标档已存在，在覆盖前先询问；
*                                                                      -p：连同文件属性一起复制，而不是使用默认属性；-r递归复制目录；-a：相当于-pdr）
*   rm [-fir] 文件或目录                               移除文件或目录（-f：强制删除，忽略不存在的文件；-i：互动模式，删除前询问使用者；-r：递归删除）
*   mv [-fiu] 来源档 目标档                            移动文件或目录（-f：若目标文件已存在直接覆盖；-i：若目标文件已存在，先询问是否覆盖；-u：若目标文件已存在，且source比较新才会升级）
* 3.文件内容查看
*   cat                                                由第一行开始显示文件内容
*   tac                                                从最后一行开始显示
*   nl                                                 显示的时候，顺道输出行号
*   more                                               一页一页的显示文件内容
*   less                                               与 more 类似，但是可以往前翻页
*   head                                               只看头几行
*   tail                                               只看尾巴几行
*   grep ‘关键字’ 文件名                             查找文件内容
* 4.文件操作
*   touch   文件名                    创建文件
*   vi      文件名                    编辑文件
*   rm      文件名                    删除文件
*   mv      文件名 新文件名           修改文件名
*   cp      文件名 新文件名           拷贝文件
* */
