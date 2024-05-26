/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Michael Bruneau
 * Created on: Dec 2023
 * This program that responds to conrtoller
*/

// variables
let distanceToObject: number = 0
let driveDirection: number = 1
let onAndOff: number = 0

// setup
radio.setGroup(7)
basic.showIcon(IconNames.Heart)

// recieving code
radio.onReceivedNumber(function (receivedNumber) {
  // drive right
  if (receivedNumber == 1) {
    robotbit.StpCarTurn((driveDirection) * 5, 42, 125)
    receivedNumber = 0
  }

  // drive left
  if (receivedNumber == 2) {
    robotbit.StpCarTurn((driveDirection) * (-5), 42, 125)
  }

  // drive forward and backward
  if (receivedNumber == 3) {
    robotbit.StpCarMove((driveDirection) * 1, 42)
  }

  // change drive drive direction
  if (receivedNumber == 4) {
    driveDirection = -1
    onAndOff = onAndOff + 1
    if (onAndOff == 2) {
      driveDirection = 1
      onAndOff = onAndOff - 2
    }
    receivedNumber = 0
  }

  // honk
  if (receivedNumber == 5) {
    music.ringTone(Note.A)
    music.ringTone(Note.C)
    music.ringTone(Note.D)
    music.ringTone(Note.F)
    music.setVolume(300)
    basic.pause(1500)
    music.stopAllSounds()
    receivedNumber = 0
  }

  // sonar
  distanceToObject = sonar.ping(
    DigitalPin.P8,
    DigitalPin.P15,
    PingUnit.Centimeters
  )

  // to close
  if (driveDirection == -1) {
    radio.sendNumber(distanceToObject)
  }
})
