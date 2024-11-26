import level1Basic from './level1/basic.json'
import level1Advanced from './level1/advanced.json'
import level2Basic from './level2/basic.json'
import level2Advanced from './level2/advanced.json'
import level3Basic from './level3/basic.json'
import level3Advanced from './level3/advanced.json'
import level4Basic from './level4/basic.json'
import level4Advanced from './level4/advanced.json'

export const poemsData = {
  '1': [...level1Basic, ...level1Advanced],
  '2': [...level2Basic, ...level2Advanced],
  '3': [...level3Basic, ...level3Advanced],
  '4': [...level4Basic, ...level4Advanced]
} 