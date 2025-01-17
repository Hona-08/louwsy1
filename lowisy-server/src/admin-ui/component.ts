import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
  Test: componentLoader.add('Test', './Test'),
  // other custom components
}

export { componentLoader, Components }
