namespace SpriteKind {
    export const Projectile2 = SpriteKind.create()
    export const Projectile2_Damaged = SpriteKind.create()
    export const EnemyBase = SpriteKind.create()
}
namespace StatusBarKind {
    export const EnemyBaseHealth = StatusBarKind.create()
    export const CatBaseHealth = StatusBarKind.create()
}
function changeZ () {
    Z += 1
    if (Z > 4) {
        Z = 0
    }
}
sprites.onOverlap(SpriteKind.Projectile2, SpriteKind.EnemyBase, function (sprite, otherSprite) {
    music.pewPew.play()
    info.changeScoreBy(25)
    OneHP = 100 / (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).width / 4)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyBaseHealth, otherSprite).value += -25
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).value += OneHP * -1
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).value += -1
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Selected_Cat == 1) {
        if (49 < Money) {
            changeZ()
            Money += -50
            Normal_Cat = sprites.create(assets.image`Normal Cat`, SpriteKind.Projectile2)
            Normal_Cat.y = 70 + Z
            Normal_Cat.x = 140
            Normal_Cat.setVelocity(-5, 0)
            music.baDing.play()
            NormCatStatus = statusbars.create(4, 1, StatusBarKind.Health)
            NormCatStatus.attachToSprite(Normal_Cat)
        } else {
            Normal_Cat_Summon.sayText("Sorry, Not Enough Cash!", 2000, false)
            music.powerDown.play()
        }
    }
    if (Selected_Cat == 2) {
        changeZ()
        if (99 < Money) {
            Money += -100
            Tank_Cat = sprites.create(assets.image`Tank Cat`, SpriteKind.Projectile2)
            Tank_Cat.y = 65 + Z
            Tank_Cat.x = 140
            Tank_Cat.setVelocity(-3, 0)
            music.baDing.play()
            TankCatStatus = statusbars.create(8, 1, StatusBarKind.Health)
            TankCatStatus.attachToSprite(Tank_Cat)
        } else {
            Tank_Cat_Summon.sayText("Sorry, Not Enough Cash!", 2000, false)
            music.powerDown.play()
        }
    }
    if (Selected_Cat == 3) {
        if (199 < Money) {
            changeZ()
            Money += -200
            Axe_Cat = sprites.create(assets.image`Axe Cat`, SpriteKind.Projectile2)
            Axe_Cat.y = 68 + Z
            Axe_Cat.x = 140
            Axe_Cat.setVelocity(-8, 0)
            music.baDing.play()
            AxeCatStatus = statusbars.create(8, 1, StatusBarKind.Health)
            AxeCatStatus.attachToSprite(Axe_Cat, 0, 6)
        } else {
            Axe_Cat_Summon.sayText("Sorry, Not Enough Cash!", 2000, false)
            music.powerDown.play()
        }
    }
})
controller.anyButton.onEvent(ControllerButtonEvent.Released, function () {
    if (Selected_Cat == 1) {
        Normal_Cat_Summon.setImage(assets.image`Normal Cat Summon Selected`)
    } else {
        Normal_Cat_Summon.setImage(assets.image`Normal Cat Summon`)
    }
    if (Selected_Cat == 2) {
        Tank_Cat_Summon.setImage(assets.image`Tank Cat Summon Selected`)
    } else {
        Tank_Cat_Summon.setImage(assets.image`Tank Cat Summon`)
    }
    if (Selected_Cat == 3) {
        Axe_Cat_Summon.setImage(assets.image`Axe Cat Summon Selected`)
    } else {
        Axe_Cat_Summon.setImage(assets.image`Axe Cat Summon`)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Selected_Cat += -1
    if (Selected_Cat == 0) {
        Selected_Cat = 3
    }
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    status.spriteAttachedTo().destroy()
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Selected_Cat += 1
    if (Selected_Cat == 4) {
        Selected_Cat = 1
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    music.wawawawaa.play()
    statusbars.getStatusBarAttachedTo(StatusBarKind.CatBaseHealth, otherSprite).value += -25
    sprite.destroy()
})
statusbars.onZero(StatusBarKind.CatBaseHealth, function (status) {
    game.over(false, effects.melt)
})
statusbars.onZero(StatusBarKind.EnemyBaseHealth, function (status) {
    game.over(true, effects.confetti)
})
sprites.onOverlap(SpriteKind.Projectile2, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    music.pewPew.play()
    info.changeScoreBy(10)
    OneHP = 100 / (statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).width / 4)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).value += OneHP * -1
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite).value += -1
})
let Doge_Enemy: Sprite = null
let Ms_Sign: Sprite = null
let AxeCatStatus: StatusBarSprite = null
let Axe_Cat: Sprite = null
let TankCatStatus: StatusBarSprite = null
let Tank_Cat: Sprite = null
let NormCatStatus: StatusBarSprite = null
let Normal_Cat: Sprite = null
let OneHP = 0
let Z = 0
let Axe_Cat_Summon: Sprite = null
let Tank_Cat_Summon: Sprite = null
let Normal_Cat_Summon: Sprite = null
let Selected_Cat = 0
let Money = 0
scene.setBackgroundImage(assets.image`ww`)
music.powerUp.play()
info.setScore(0)
Money = 0
Selected_Cat = 1
let Cat_Base = sprites.create(assets.image`Cat Base`, SpriteKind.Player)
Cat_Base.y = 63
Cat_Base.right = 160
let statusbar = statusbars.create(16, 2, StatusBarKind.CatBaseHealth)
statusbar.attachToSprite(Cat_Base)
let Doge_Base = sprites.create(assets.image`Doge Base`, SpriteKind.EnemyBase)
Doge_Base.y = 63
Doge_Base.left = 1
statusbar = statusbars.create(16, 2, StatusBarKind.EnemyBaseHealth)
statusbar.attachToSprite(Doge_Base)
let moneyText = textsprite.create("Money:", 1, 4)
moneyText.left = 2
moneyText.y = 5
let moneyCount = textsprite.create("0", 1, 4)
moneyCount.left = 40
moneyCount.y = 5
let Map = textsprite.create("Korea", 4, 5)
Map.left = 2
Map.y = 13
Normal_Cat_Summon = sprites.create(assets.image`Normal Cat Summon Selected`, SpriteKind.Projectile)
Normal_Cat_Summon.y = 100
Normal_Cat_Summon.x = 40
Tank_Cat_Summon = sprites.create(assets.image`Tank Cat Summon`, SpriteKind.Projectile)
Tank_Cat_Summon.y = 100
Tank_Cat_Summon.x = 80
Axe_Cat_Summon = sprites.create(assets.image`Axe Cat Summon`, SpriteKind.Player)
Axe_Cat_Summon.y = 100
Axe_Cat_Summon.x = 120
Z = 0
forever(function () {
    pause(150000)
    Ms_Sign = sprites.create(assets.image`Ms Sign`, SpriteKind.Enemy)
    Ms_Sign.y = 70
    Ms_Sign.x = 20
    Ms_Sign.setVelocity(1, 0)
})
forever(function () {
    Money += 1
    moneyCount.setText(convertToText(Money))
    pause(100)
})
forever(function () {
    pause(8000)
    if (randint(1, 3) % 3 == 0) {
        Doge_Enemy = sprites.create(assets.image`Snake`, SpriteKind.Enemy)
        Doge_Enemy.y = 70 + randint(0, 4)
        Doge_Enemy.x = 20
        Doge_Enemy.setVelocity(10, 0)
    } else {
        Doge_Enemy = sprites.create(assets.image`Doge Enemy`, SpriteKind.Enemy)
        Doge_Enemy.y = 70 + randint(0, 4)
        Doge_Enemy.x = 20
        Doge_Enemy.setVelocity(8, 0)
    }
})
