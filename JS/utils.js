/* Array functions */
export const chunkArray = (arr, chunkSize) => {
  const arrayLength = arr.length
  let tempArray = []

  for (let index = 0; index < arrayLength; index += chunkSize) {
    let chunk = arr.slice(index, index + chunkSize)
    tempArray.push(chunk)
  }
  return tempArray
}

// what is property
export const dynamicSort = (property) => {
  let sortOrder = 1
  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }
  return (a, b) => {
    let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
    return result * sortOrder
  }
}

/* Date functions */
// Requires the Datepicker plugin
export const getMonthDiff = (dateFrom, dateTo) => {
  return dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
}

export const getYearDiff = (dateFrom, dateTo) => {
  return dateTo.getFullYear() - dateFrom.getFullYear()
}

export const addMonths = (date, months) => {
  let d = date.getDate()

  date.setMonth(date.getMonth() + (+months))
  if (date.getDate() != d) {
    date.setDate(0)
  }
  return date
}


/* DOM functions */
export const wrap = (node, wrapper) => {
  node.parentNode.insertBefore(wrapper, node)
  wrapper.appendChild(node)

  return wrapper
}

export const wrapAll = (nodes, wrapper) => {
  let parent = nodes[0].parentNode
  let previousSibling = nodes[0].previousSibling

  for (let i = 0; nodes.length - i; wrapper.firstChild === nodes[0] && i++) {
    wrapper.appendChild(nodes[i])
  }

  let nextSibling = previousSibling ? previousSibling.nextSibling : parent.firstChild
  parent.insertBefore(wrapper, nextSibling)
  return wrapper
}

export const contains = (selector, text) => {
  const els = getAll(selector)
  return [].filter.call(els, el => {
    return RegExp(text).test(el.textContent)
  })
}

export const clearElement = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild)
  }
}

export const getAll = (selector, root = document) => {
  return Array.prototype.slice.call(root.querySelectorAll(selector), 0)
}

export const getClosestEl = (el, selector) => {
  let closestNode = el.closest(selector)

  return closestNode ? closestNode : null
}

export const getSiblings = (el) => {
  let siblings = []
  let sibling = el.parentNode.firstChild

  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== el) {
      siblings.push(sibling)
    }
    sibling = sibling.nextSibling
  }
  return siblings
}

export const getNextSiblings = (el, filter) => {
  let siblings = []

  while (el = el.nextSibling) {
    if (!filter || filter(el)) siblings.push(el)
  }
  return siblings
}

export const insertAfter = (newNode, referenceNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

export const elementContains = (parent, child) => parent !== child && parent.contains(child);


/* Event functions */
export const triggerEvent = (el, evt) => {
  el.dispatchEvent(new Event(evt))
}

export const debounce = (func, timeout = 300) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, args) }, timeout)
  }
}


/* Label functions */
export const changePlaceholder = (arr) => {
	[].forEach.call(arr, (e) => {
		const elId = e.id;
		const label = document.querySelector("label[for=" + elId + "]");
		let firstOption;

		if (e.nodeName === 'SELECT') {
			firstOption = e.options[0];
		}

		if (elId && label) {
			if (firstOption) {
				firstOption.text = label.textContent;
			} else {
				e.placeholder = label.textContent;
			}
			label.style.visibility = "visually-hidden";
		}
	});
};


/* Form input functions */
export const increaseOnly = (minAmount) => {
  if (event.target.value < minAmount || isNaN(parseFloat(event.target.value))) {
    event.target.value = minAmount
  }
}

export const clearValue = (el) => {
  el.value = ''
}

export const addPlaceholder = (el, placeholder) => {
  el.placeholder = placeholder
}

export const trimValue = (e) => {
  e.currentTarget.value = trim(e.currentTarget.value)
}


/* Input select-one functions */
export const moveOptionToTop = (el, optionText) => {
  const option = Array.from(el.querySelectorAll('option')).filter(obj => {
    return obj.textContent.indexOf(optionText) > -1
  })

  if (option[0]) {
    el.remove(option[0].index)
    el.add(option[0], el.querySelector('option:nth-child(2)'))
  }
}

export const getSelectedOptionAttribute = (el, attr) => {
  return el.options[el.selectedIndex].getAttribute(attr)
}

export const getSelectedOptionText = (el) => {
  return el.options[el.selectedIndex].text
}

export const getSelectedOptionValue = (el) => {
  return el.options[el.selectedIndex].value
}

export const getSelectedOptionRedirect = (el) => {
  return el.options[el.selectedIndex].dataset.redirecturl
}

export const selectOption = (el, valueToSelect) => {
  el.value = valueToSelect
  triggerEvent(el, 'change')
}

export const selectOptionByText = (el, textToFind) => {
  el.selectedIndex = [...el.options].findIndex(option => option.text.toLowerCase() === textToFind.toLowerCase())
  if (el.selectedIndex > -1) {
    setTimeout(() => {
      triggerEvent(el, 'change')
    }, 100)
  }
}

export const addOptions = (dropdown, opts) => {
  opts.forEach(el => {
    return typeof el === 'string' ? createOption(dropdown, el) : createDesignationOption(dropdown, el)
  })
}

export const clearOptions = (el) => {
  while (el.childNodes.length > 2) {
    el.removeChild(el.lastChild)
  }
}

export const createDesignationOption = (el, option) => {
  let opt = document.createElement('option')
  const item = option.item ? option.item : option

  opt.value = item.guid
  opt.text = item.name
  opt.setAttribute('data-lookupId', item.lookupId)
  if (item.redirectURL !== '') {
    opt.setAttribute('data-redirectURL', item.redirectURL)
  }
  return el.nodeName.toLowerCase() === 'select' ? el.add(opt) : el.appendChild(opt)
}

export const getISO = (el) => {
  return el.options[el.selectedIndex].getAttribute('iso')
}

export const createOption = (el, option) => {
  const optionText = option.split('>')
  let opt = document.createElement('option')

  opt.value = option
  opt.text = optionText.length > 1 ? optionText[optionText.length - 1] : option
  el.add(opt)
}

export const createGuidOption = (el, option) => {
  let opt = document.createElement('option')

  opt.value = option.Id
  opt.text = option.Description
  el.add(opt)
}

export const createISOOption = (el, obj) => {
  let opt = document.createElement('option')

  opt.value = obj.Id
  opt.text = obj.Description
  opt.setAttribute('iso', obj.ISO)
  el.add(opt)
}

export const createOptGroup = (dropdown, group, objs) => {
  let optGroup = document.createElement('optgroup')

  optGroup.setAttribute('label', '[' + group + ']')
  objs.forEach(obj => {
    createDesignationOption(optGroup, obj)
  })
  dropdown.appendChild(optGroup)
}

export const addBlankOption = (el) => {
  return el.add(new Option('\u2014 Select \u2014', '', true, true), el.options[0])
}

export const createDropdown = (field, dropdown, els) => {
  if (field && dropdown) {
    clearOptions(dropdown)
    els.forEach(el => {
      return typeof el === 'string' ? createOption(dropdown, el) : createDesignationOption(dropdown, el)
    })
  }
}


/* Location functions */
export const redirect = (url) => {
  window.location.assign(url)
}


/* Number functions */
export const numToFloat = (num, decPlaces) => {
  return num.toFixed(decPlaces)
}

export const addCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const stripCommas = (str) => {
  return str.replace(/\,/g, '')
}


/* Property functions */
export const setAttributes = (el, options) => {
  Object.keys(options).forEach(attr => {
    el.setAttribute(attr, options[attr])
  })
}

export const disableFields = (el) => {
  const fields = el.querySelectorAll('input, select, textarea')

  el.disabled = true
  if (fields.length > 0) {
    fields.forEach(field => {
      field.disabled = true

      switch (field.type.toLowerCase()) {
        case 'checkbox' || 'radio':
          field.checked = false
          break
        case 'select-one' || 'textarea':
          field.value = ''
          break
        default:
          field.value = ''
      }
    })
  }
}

export const enableFields = (el) => {
  const fields = el.querySelectorAll('input, select, textarea')

  el.disabled = false
  if (fields.length > 0) {
    fields.forEach(field => {
      field.disabled = false
    })
  }
}

export const makeRequired = (el) => {
  el.required = true
}


/* String functions */
export const updateText = (el, str) => {
  el.innerText(str)
}


/* Scroll functions */
export const scrollToTop = () => {
	const c = document.documentElement.scrollTop || document.body.scrollTop;
	if (c > 0) {
		window.requestAnimationFrame(scrollToTop);
		window.scrollTo(0, c– c / 8);
	}
};
