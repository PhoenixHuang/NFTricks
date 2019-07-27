# NFTricks
some tricks for nfeild
=====
* [1.Other传值](#1Other传值)
* [2.记录时间](#2记录时间)
* [3.计算答案数量](#3计算答案数量)
* [4.Control](#4Control)
* [5.Date](#5Date)
* [6.检查答案长度](#6检查答案长度)
* [7.在一个码号中可以执行多条语句](#7在一个码号中可以执行多条语句)
* [8.在一个if语句中也可以执行多条语句](#8在一个if语句中也可以执行多条语句)
* [9.IF Condition](#9IF_Condition)
* [10.String](#10String)
* [11.*INCLUDE/*COPY/*EXCLUDE/*PUT](#11*INCLUDE/*COPY/*EXCLUDE/*PUT)
* [12.品牌联动](#12品牌联动)

# 1.Other传值
~~~
*Textvars Q1Other
*Q 1  *Codes L1
1:a
2:b
3:other *open *save Q1Other

*Q 2 *codes L1
1:a
2:b
3:*? Q1Other
~~~
------------------------------------------------------------------------------------------------------------
# 2.记录时间
~~~
*QUESTION 9140 *NUMBER 5450L3 *VAR "QTime_RV_TrAAlt2"
**记录时间
*INCLUDE Q9140 [STOPWATCH[3]]   
**重置计时器
*PUT STOPWATCH[3] [0]
~~~
Stopwatch[3] can be used as a timer that you have to reset yourself setting the value to 0. This timer starts as soon as the interview is started or once it it reset. 
------------------------------------------------------------------------------------------------------------
# 3.计算答案数量
~~~
*VARS cnt2
*COUNT cnt2 Q40010  
~~~
------------------------------------------------------------------------------------------------------------
# 4.Control
~~~
*CONTROL Q41015 W 从Q41015的答案中取值
*CONTROL Q41015 N 把Q41015的答案排除
~~~
------------------------------------------------------------------------------------------------------------
# 5.Date
~~~
*textvars mydate
*date mydate
~~~
现在mydate=2008/01/31 1415:30
获取year, month, date
~~~
*VARS numyear, nummonth, numdate
*PUT numyear [STRSUBSTR(mydate, 1, 4)]
*PUT nummonth [STRSUBSTR(mydate, 6, 2)]
*PUT numdate [STRSUBSTR(mydate, 9, 2)]

*page
*? numyear
*? nummonth
*? numdate
~~~
与此对应, 还有一个*time命令
~~~
*QUESTION 901 *ALPHA 101L7
*TIME Q901 
~~~
现在Q901=1415:30  
------------------------------------------------------------------------------------------------------------
# 6.检查答案长度
~~~
*textvars A5
*QUESTION 10024 *ALPHA 7100L17 *VAR "A5" *SAVE A5
请输入被访者车架号:
**if中用#表示not
*QUESTION 10034 *CODES 7502L1 *IF [#(STRLENGTH(A5)=17)]
车架号必须是17位数!
1:返回 *BACK 10024
~~~
------------------------------------------------------------------------------------------------------------
# 7.在一个码号中可以执行多条语句
~~~
*QUESTION 10 *CODES 210L2 *VAR "SC_NrCar"
请问您家中有多少辆5年或以下的汽车？
**None     --->      (Terminate interview)

97:没有 *PUT NoCar [1] *GOTO 998
~~~
------------------------------------------------------------------------------------------------------------
# 8.在一个if语句中也可以执行多条语句
~~~
*IF [Q20,998] *PUT WrongMake [1] *GOTO 5000 **OTHER MAKE
~~~
------------------------------------------------------------------------------------------------------------
# 9.IF Condition
~~~
*if [Q1, 1]
*if [Q1, 1,2,4]
*if [Q1, 1-4]
*if [Q1 = "PC"]
*if [Q1,1 & Q2,2] **and
*if [Q1,1 \ Q2,2] **or
*if [ Q13 >= 18 ]
*if [ Q13 = Q14 ] **if the (highest) value of Q13 is equal to the (highest) value of Q14
*if [ #(Q5 \ Q6) & Q7 = 1 ]  **if either Q5 or Q6 does not contain a value and Q7 equals 1
*if [ Q5 , 1 TO 3 ]  **if any of the codes 1, 2 or 3 are marked in Q5.
*if [ Q5 , 1 TO 3 ; 6 TO 8]  **if any of the codes 1, 2, 3, 6, 7, or 8 are marked in Q5.
~~~
------------------------------------------------------------------------------------------------------------
# 10.String
~~~
STRFINDMATCH(<string>,<regex>)
STRHASMATCH(<string>,<regex>)
STRINDEX(<string>,<findstring>)
STRLENGTH(<string>)
STRLOWER(<string>)
STRSUBSTR(<string>,<start>,<length>)
STRTRIM(<string>)
STRUPPER(<string>)
~~~
------------------------------------------------------------------------------------------------------------
# 11.*INCLUDE/*COPY/*EXCLUDE/*PUT
*include 用来把数据从一个多选题传到另一个多选. include只加码, 不覆盖码
~~~
*IF [ Q2 , 1-21 ] *INCLUDE Q1 Q2  **把Q2的答案给到Q1
*IF [ Q3 , 1-21 ] *INCLUDE Q1 Q3  **把Q3的答案给到Q1
*IF [ Q2 , 29 & Q3 , 29 ] *INCLUDE Q1 [ 29 ] **把码29给到Q1
~~~

*copy用来传递单选数据或单个码,  copy会覆盖数据.  copy还可以用于alpha题

*exclude用来移除码
~~~
*exclude Q1, Q1 用来清除这题的答案
~~~

*INCLUDE只可用于多选, *COPY只可用于单选, *EXCLUDE两者都可以用

*put用来往变量里存数据
*PUT <var> <"text" | [value] | Qn | Qn,code | [expression] >
~~~
*PUT age Q1
*PUT paper Q2,?R
*PUT sex "Men"
*PUT country [20]
*PUT ar [STRSUBSTR(edatum, 1, 4)]
*PUT makeName "*? carName"

*SAMPLEDATA Gender
*PUT Gender [Q7] 
*PUT country [Q10000]
*PUT STOPWATCH[3] [0]
/////////////////////////////
*vars myQ6num
*vars myQ6Text
*Q 6 *codes 200L1 
How old are you?
1:15-29
2:30-45
*put myQ6num Q6   myQ6num=1
*put myQ6num [Q6] myQ6num=1

*put myQ6Text Q6   myQ6Text=1
*put myQ6Text [Q6] myQ6Text=1

在这里, Q6加不加[], 是vars还是textvars, 结果都一样, 都是取得码号

*put myQ6Text Q6,2
if myQ6Text is vars, then myQ6Text=2, 传递的是码号
if myQ6Text is textvars, then myQ6Text="30-45", 传递的是码文本

*put myQ6Text [Q6,2]  这里加[]结果就完全不同了
~~~
在这里,[Q6,2]变成了一个bool变量. 如果Q6选了2, 则myQ6Text=1; 如果Q6没有选2, 则myQ6Text=0
------------------------------------------------------------------------------------------------------------
# 12.品牌联动
~~~
*list MasterBrand
1:a
2:b
3:c
4:d

*list SubBrand_1
1:a1
2:a2
3:a3

*list SubBrand_2
1:b1
2:b2
3:b3

*Q 1 *Codes 100L1
Your master brand is?
*uselist MasterBrand

*vars mycode
*put mycode Q1
*Q2 *Codes 200L1
Your sub brand is?
*uselist "SubBrand_*? mycode"
~~~
------------------------------------------------------------------------------------------------------------



