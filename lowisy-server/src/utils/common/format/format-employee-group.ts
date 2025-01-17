type GenerateTree<T> = {
  data: T[]
  childrenKey?: 'subCategories'
}
type RecursiveTree<T> = {
  [key: string]: RecursiveTree<T>[] | []
}

export function generateTree<T>({ data, childrenKey }: GenerateTree<T>) {
  const tree: RecursiveTree<T>[] = []
  const childrenOf: Record<number, T[]> = {}
  data.forEach((item: any) => {
    const { id, parentId = 0 } = item
    childrenOf[id] = childrenOf[id] || []
    item[childrenKey] = childrenOf[id]
    parentId
      ? (childrenOf[parentId] = childrenOf[parentId] || []).push(item)
      : tree.push(item)
  })
  return tree
}
