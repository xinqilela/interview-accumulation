/*
* 面试官好，我是胡鑫琪，现就职于网易传媒技术部，主要工作内容为负责公司内部大数据可视化平台的开发和维护工作。
* 入职以来独立负责MpData自媒体数据平台、星云分析系统、接口平台的前端开发工作，同时参与BigData开放平台、数易
* 平台等数据平台的开发和维护工作。
* */

/*
MP-Data自媒体数据平台:
  项目背景：
    1.网易号业务趋于稳定，目前无集中定向观测分析业务的平台；
    2.网易号产品层数据相对混乱，需优先梳理；
    3.业务较成熟，定制化需求相对较多，定制化开发系统更利于辅助驱动业务。
  产品定位：
    网易号业务运营分析专项系统，一站式解决网易号业务日常运营分析场景的数据需求。
* */

/*
* 项目中遇到的问题和难点：
* 1.由于项目中很多场景都要基于时间范围查询数据，所以基于antd的RangePicker组件封装了一个具有快捷选择功能的时间范围
*   选择组件，以便在多个页面的不同地方进行复用，但是由于业务场景的特殊需求，我们需要在此基础上增加1个新的功能：
*       限制用户的输入范围，如我们需要限制用户的输入范围在3个月内，当用户通过输入框调整开始时间时，若此时开始时间
*    与结束时间的差距超过3个月，我们需要设置结束时间为开始时间加3个月的那个日期。但是RangePicker的onChange事件
*    没有暴露出事件对象，因此我们无法知道当前用户修改的是开始时间还是结束时间。所以我们需要注册一个时间，判断当前
*    改变的是那个时间框。
* 2.Tab块内的chart，当浏览器窗口大小发生改变后，那些之前显示过的chart无法显示出来，我们需要在点击tab时显示的为chart设置
*   正确的宽高。
* */

