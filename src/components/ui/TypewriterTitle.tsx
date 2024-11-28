'use client'
import React from 'react'
import  Typewriter from 'typewriter-effect';
type Props = {}

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
    options={{
      loop: true,
    }}
    onInit={(typewriter) => {
      typewriter
        .typeString('AI powered note taking.')
        .pauseFor(1000)
        .deleteAll()
        .typeString('Experience the power of AI in your notes!!')
        .pauseFor(1000)
        .deleteAll()
        .typeString('Easy to use, customizable, and secure!')
        .pauseFor(1000)
        .deleteAll()
        .start();
    }}
  />
  )
}

export default TypewriterTitle