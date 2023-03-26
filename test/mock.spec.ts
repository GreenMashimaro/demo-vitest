import { describe, expect, it, vi } from 'vitest'

describe('mock main', () => {
  it('getUserMsg mock success', async function() {
    vi.resetModules()
    vi.doMock('@/user/index', async () => {
      return {
        default: function() {
          return 'mock_success'
        }
      }
    })
    const { getUserMsg } = await import('@/index')
    expect(getUserMsg()).toBe('mock_success')
    vi.doUnmock('@/user/index')
  })

  it('getUserMsg mock fail', async function() {
    vi.resetModules()
    vi.doMock('@/user/index', async () => {
      return {
        default: function() {
          return 'mock_fail'
        }
      }
    })
    const { getUserMsg } = await import('@/index')
    expect(getUserMsg()).toBe('mock_fail')
    vi.doUnmock('@/user/index')
  })

  it('getUserMsg real', async function() {
    vi.resetModules()
    const { getUserMsg } = await import('@/index')
    expect(getUserMsg()).toBe('hello user')
  })
})