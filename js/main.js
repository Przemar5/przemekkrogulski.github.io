const CANVAS = document.querySelector('.canvas')
// const CTX = CANVAS.getContext('2d')

// CANVAS.width = innerWidth
// CANVAS.height = innerHeight

// CTX.beginPath()
// CTX.moveTo(0, 0)
// CTX.lineTo(1000, 1000)
// CTX.stroke()


$(document).ready(function () {

	const navbarLinks = $(document).find('.navbar__list').find('a')

	const sectionIds = navbarLinks.map(function () {
		return $(this).attr('href')
	})

	const sectionOffsets = sectionIds.map(function () {
		let elementId = this.valueOf()
		return $(elementId).offset().top
	})

	const sectionOffsetByIds = (function (sectionIds, sectionOffsets) {
		let map = []

		for (let i = 0; i < sectionIds.length; i++) {
			map.push([sectionIds[i], sectionOffsets[i]])
		}

		return map
	})(sectionIds, sectionOffsets)

	const activateTabOnLoad = (sectionOffsetByIds) => {
		let uri = window.location.href
		let currentTab = uri.substring(uri.lastIndexOf('/') + 1)
		
		if (currentTab == '') {
			$(navbarLinks[0]).addClass('active')
		
		} else {
			for (i in sectionOffsetByIds) {
				if (sectionOffsetByIds[i][0] == currentTab) {
					$(navbarLinks[i]).addClass('active')
				}
			}
		} 
	}

	activateTabOnLoad(sectionOffsetByIds)

	const activateTabs = (sectionOffsetByIds) => (offset) => {
		let length = sectionOffsetByIds.length
		let currentTabIndex = null

		for (i in sectionOffsetByIds) {
			if (offset >= sectionOffsetByIds[length - i - 1][1]) {
				currentTabIndex = length - i - 1
				break
			}
		}

		navbarLinks.each((index) => {
			$(navbarLinks[index]).removeClass('active')
		})

		$(navbarLinks[currentTabIndex]).addClass('active')
	}

	const activateTabWhenScroll = activateTabs(sectionOffsetByIds)

	$(document).on('scroll', function () {
		var scroll = $(document).scrollTop()

		activateTabWhenScroll(scroll)
	});

	// ObjectIterator
	const ObjectIterator = (function (objectArray) {
		var index = 0
		var objectArray = objectArray

		this.prototype.first = () => {
			index = 0
			return objectArray[index]
		}
		this.prototype.current = () => {
			return objectArray[index]
		}
		this.prototype.next = () => {
			index++
			return objectArray[index]
		}

		return this
	})

	console.log(new ObjectIterator(sectionOffsetByIds))
})