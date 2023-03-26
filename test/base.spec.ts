/**
 * @vitest-environment jsdom
 */
import { expect, beforeAll, afterAll } from 'vitest';
import { describe, test, vi } from 'vitest';
import { renderDom, stepTime, getTime, requestGet } from '@/index'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const restHandlers = [
  rest.get('/test_get', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({
      code: 0,
      msg: 'ok'
    }))
  })
]

const server = setupServer(...restHandlers)

// 在所有测试之前启动服务器
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// 所有测试后关闭服务器
afterAll(() => server.close())

describe('base main', () => {
  test('renderDom', () => {
    const aa = renderDom()
    console.log(aa)
  })

  test('stepTime', () => {
    vi.useFakeTimers()

    const fn1 = vi.fn()
    const fn2 = vi.fn()
    const fn3 = vi.fn()

    stepTime(fn1, fn2, fn3)

    expect(fn1).not.toBeCalled()
    expect(fn2).not.toBeCalled()
    expect(fn3).not.toBeCalled()
    vi.advanceTimersByTime(500)

    expect(fn1).not.toBeCalled()
    expect(fn2).not.toBeCalled()
    expect(fn3).not.toBeCalled()
    vi.advanceTimersByTime(10 * 1000 - 500)
    expect(fn1).toBeCalled()
    expect(fn2).not.toBeCalled()
    expect(fn3).not.toBeCalled()
    vi.advanceTimersByTime(10 * 1000)
    expect(fn2).toBeCalled()
    expect(fn3).not.toBeCalled()

    vi.useRealTimers()
  })

  test('getTime', () => {
    vi.useFakeTimers()
    const date = new Date(2000, 1, 1, 13)
    vi.setSystemTime(date)

    const time = getTime()
    expect(time).toMatchInlineSnapshot('2000-02-01T05:00:00.000Z')

    vi.useRealTimers()
  })

  test.only('test get', async () => {
    const res = await requestGet()
    expect(res.data).toEqual({ code: 0, msg: 'ok' })
  })
})
