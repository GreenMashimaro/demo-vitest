import userMsg from './user/index'
import axios from 'axios'

export function getUserMsg () {
  return userMsg()
}

export function renderDom() {
  const el = document.createElement('div')
  el.id = 'div1'
  document.body.append(el)

  return document.getElementById('div1')
}

export function stepTime(fn1: () => void, fn2: () => void, fn3: () => void) {
  setTimeout(() => {
    fn1()
  }, 10 * 1000)

  setTimeout(() => {
    fn2()
  }, 20 * 1000)

  setTimeout(() => {
    fn3()
  }, 30 * 1000)
}

export function getTime() {
  return new Date()
}

export function requestGet() {
  return axios.get('test_get')
}

function add(num1: number, num2: number): number {
  return num1 + num2
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('add', () => {
    expect(add(1, 2)).toBe(3)
  })
}
