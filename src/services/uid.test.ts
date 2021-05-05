import { generateUID } from './uid'

describe('test uid generation', () => {
  it("verifys multiple uids for length", () => {
    let uids = new Array<String>(50);
    uids = uids.fill('').map(() => generateUID());

    let allLengthOfEleven = uids.every(val => {
      return val.length == 12;
    });

    expect(allLengthOfEleven).toEqual(true)
  })

  it("verifys that not dangerous characters exist", () => {
    let uids = new Array<String>(50);
    uids = uids.fill('').map(() => generateUID());

    let containsDangerousChar = uids.find(val => {
      val.match(/[/+*?&]/g)
    });

    expect(containsDangerousChar).toEqual(undefined)
  })
})