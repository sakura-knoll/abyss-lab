import { doesDirExist } from './fsUtils'
import path from 'path'

describe('doesDirExist', () => {
  it('returns true if dir exists', () => {
    const existingDir = path.join(process.cwd(), 'src')
    const fn = jest.fn(doesDirExist)

    fn(existingDir)

    expect(fn).toReturnWith(true)
  })

  it('returns false if dir does not exist', () => {
    const existingDir = path.join(process.cwd(), 'never-exists')
    const fn = jest.fn(doesDirExist)

    fn(existingDir)

    expect(fn).toReturnWith(false)
  })
})
