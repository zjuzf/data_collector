# 使用说明


## 动作 & 动作细节
一个动作可能会有多个动作细节
    
    1.长带球 E_LONG_RUN
    2.带球 E_RUN
    3.传球 E_PASS
        长传 Q_PASS_LONG
        传中 Q_PASS_CROSS
        头球 Q_PASS_HEAD
        直塞 Q_PASS_THROUGH
        任意球 Q_PASS_FREE_KICK
        角球 Q_PASS_CORNER
        进攻性 Q_PASS_ATTACKING
        界外球 Q_PASS_THROW_IN
        落点横坐标 Q_PASS_END_X
        落点纵坐标 Q_PASS_END_Y
        挑传 Q_PASS_CHIPPED
        回做传球 Q_PASS_LAY_OFF
        发动 Q_PASS_LAUNCH
        头球摆渡 Q_PASS_FLICK_ON
        急停回撤 Q_PASS_PULL_BACK
        来回互传 Q_PASS_SWITCH_OF_PLAY
    4.射门：射偏 E_SHOT_MISS
        球门横坐标 Q_SHOT_GOAL_MOUTH_Y
        球门高坐标 Q_SHOT_GOAL_MOUTH_Z
    5.射门：击柱 E_SHOT_POST
        球门横坐标 Q_SHOT_GOAL_MOUTH_Y
        球门高坐标 Q_SHOT_GOAL_MOUTH_Z
    6.射门：被救 E_SHOT_SAVED
        (球门横坐标 Q_SHOT_GOAL_MOUTH_Y
        球门高坐标 Q_SHOT_GOAL_MOUTH_Z)
        或
        (遇阻横坐标 Q_SHOT_BLOCKED_X
        遇阻纵坐标 Q_SHOT_BLOCKED_Y)
    7.射门：成功 E_SHOT_GOAL
        球门横坐标 Q_SHOT_GOAL_MOUTH_Y
        球门高坐标 Q_SHOT_GOAL_MOUTH_Z
    8.射门：错失机会 E_SHOT_CHANCE_MISSED
        球门横坐标 Q_SHOT_GOAL_MOUTH_Y
        球门高坐标 Q_SHOT_GOAL_MOUTH_Z

## **注意**

当动作为E_SHOT_SAVED ("射门：被救")时，动作细节也有可能为Q_SHOT_GOAL_MOUTH_Y Z 而不是Q_SHOT_BLOCKED_X Y 具体要视射门是被防守球员/守门员拦截，还是被守门员扑出

即E_SHOT_SAVED并且被拦截，则为Q_SHOT_BLOCKED

E_SHOT_SAVED并且被守门员扑出，则为Q_SHOT_GOAL_MOUTH
## 需要值的动作细节
## Q_PASS_END_X, (落点横坐标)
## Q_PASS_END_Y, (落点纵坐标)
### 说明：
    1.只有传球的落点在禁区内时才需要记录
    2.坐标系为球场 范围[0-100]
### 如图所示：
![](./picture/soccer1.png)

## Q_SHOT_GOAL_MOUTH_Y, (球门高坐标)
## Q_SHOT_GOAL_MOUTH_Z, (球门横坐标)
### 说明：
    1.对于Y坐标 球门宽度为[45-55] 范围[0-100]
    2.对于Z坐标 球门高度为40, 请以球门为参照物估计球的落点 范围[0-100]
### 如图所示：
![](./picture/soccer2.png)
## Q_SHOT_BLOCKED_X, (遇阻纵坐标)
## Q_SHOT_BLOCKED_Y, (遇阻横坐标)
### 说明：
    1.当动作为 E_SHOT_SAVED ("射门：被救") 且射门被守门员或防守球员拦截时
