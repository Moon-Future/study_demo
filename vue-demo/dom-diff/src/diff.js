const ATTRS = 'ATTRS'
const TEXT = 'TEXT'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
let Index = 0

function diff(oldTree, newTree) {
  let patches = {}
  let index = 0
  // 递归树，比较后结果放到补丁包中
  walk(oldTree, newTree, index, patches)
  return patches
}

function diffAttr(oldAttrs, newAttrs) {
  let patch = {}
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key]
    }
    for (let key in newAttrs) {
      // 新增节点
      if (!oldAttrs.hasOwnProperty(key)) {
        patch[key] = newAttrs[key]
      }
    }
  }
  return patch
}

function diffChildren(oldChildren, newChildren, index, patches) {
  oldChildren.forEach((child, idx) => {
    walk(child, newChildren[idx], ++Index, patches)
  })
}

function isString(node) {
  return Object.prototype.toString.call(node) === '[object String]'
}

function walk(oldNode, newNode, index, patches) {
  let currentPatch = []
  if (!newNode) {
    currentPatch.push({ type: REMOVE, index })
  } else if (isString(oldNode) && isString(newNode)) {
    if (oldNode != newNode) {
      currentPatch.push({ type: TEXT, text: newNode })
    }
  } else if (oldNode.type === newNode.type) {
    // 比较属性是否有修改
    let attrs = diffAttr(oldNode.props, newNode.props)
    if (Object.keys(attrs).length > 0) {
      currentPatch.push({ type: ATTRS, attrs })
    }
    // 如果有子节点，遍历子节点
    diffChildren(oldNode.children, newNode.children, index, patches)
  } else {
    // 节点被替换
    currentPatch.push({ type: REPLACE, newNode })
  }
  if (currentPatch.length > 0) {
    patches[index] = currentPatch
  }
}

export default diff
