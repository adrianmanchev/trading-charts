import * as d3 from 'd3'

export default (data, {
  x = ([x]) => x,
  y = ([, y]) => parseFloat(y),
  curve = d3.curveMonotoneX,
  ease = d3.easeLinear,
  duration = 230,
  marginTop = 0,
  marginRight = 48,
  marginBottom = 18,
  marginLeft = 0,
  width = 960,
  height = width * 0.5625,
  xType = d3.scaleTime,
  xRange = [marginLeft, width - marginRight],
  yType = d3.scaleLinear,
  yRange = [height - marginBottom, marginTop],
  color = 'currentColor',
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  strokeWidth = 1.5,
  strokeOpacity = 1,
  priceScale = 2,
  priceUnit,
  element = '#price-chart'
} = {}) => {
  const ax = 6
  const mx = 10
  const px = 34
  const py = 16
  const chartWidth = width - marginRight - marginLeft

  let X = null
  let Y = null
  let I = null

  let defined = null
  let D = null

  let xDomain = null
  let yDomain = null

  let xScale = null
  let yScale = null

  let xAxis = null
  let yAxis = null

  const init = () => {
    X = d3.map(data, x)
    Y = d3.map(data, y)
    I = d3.map(data, (_, i) => i)

    defined = (d, i) => X[i] && Y[i]
    D = d3.map(data, defined)

    const yt = height / 80
    const ymin = d3.min(Y)
    const ymax = d3.max(Y)
    const yslice = (ymax - ymin) / yt
    const yd = parseInt(yslice).toFixed(0).length - 1

    let ygap = Math.round((yslice) / `1e${yd}`) * `1e${yd}`
    ygap = ygap < 1 ? yslice : ygap

    xDomain = d3.extent(X)
    yDomain = [
      ymin - ygap,
      ymax + ygap
    ]

    xScale = xType(xDomain, xRange)
    yScale = yType(yDomain, yRange)

    xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSize(3).tickSizeOuter(0)
    yAxis = d3.axisRight(yScale).ticks(yt).tickSize(3).tickSizeOuter(0)
  }

  init()

  const total = X.length
  const interval = X[1] - X[0]

  const formatDate = xScale.tickFormat(null, '%-d %b %Y')
  const formatHour = xScale.tickFormat(null, '%H:%M')
  const formatValue = yScale.tickFormat(0, d3.format(`,.${priceScale}f`))
  const title = i => [formatDate(X[i]), formatHour(X[i]), `${formatValue(Y[i])} ${priceUnit}`]

  const price = i => `${formatValue(Y[i])}`
  const date = i => `${formatDate(X[i])} ${formatHour(X[i])}`

  const line = d3.line()
    .defined(i => D[i])
    .curve(curve)
    .x(i => xScale(X[i]))
    .y(i => yScale(Y[i]))

  const area = d3.area()
    .defined(i => D[i])
    .curve(curve)
    .x(i => xScale(X[i]))
    .y0(height - marginTop - marginBottom)
    .y1(i => yScale(Y[i]))

  const svg = d3.create('svg:svg')
    .attr('width', width)
    .attr('height', height)
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
    .style('-webkit-tap-highlight-color', 'transparent')
    .style('overflow', 'visible')

  const defs = svg.append('svg:defs')

  const dropShadow = defs.append('filter')
    .attr('id', 'dropShadow')

  dropShadow.append('feDropShadow')
    .attr('dx', 0)
    .attr('dy', 0.7)
    .attr('stdDeviation', 1)
    .attr('flood-opacity', 0.21)

  const areaGradient = defs.append('linearGradient')
    .attr('id', 'areaGradient')
    .attr('x1', '0%').attr('y1', '0%')
    .attr('x2', '0%').attr('y2', '100%')

  areaGradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', color)
    .attr('stop-opacity', 0.6)

  areaGradient.append('stop')
    .attr('offset', '80%')
    .attr('stop-color', 'white')
    .attr('stop-opacity', 0)

  const gx = svg.append('g')
    .attr('transform', `translate(0, ${height - marginBottom})`)
    .call(xAxis)
    .attr('font-family', 'inherit')
    .call(g => g.selectAll('.domain').remove())
    .call(g => g.selectAll('.tick line')
      .attr('stroke-opacity', 0.50))

  const gy = svg.append('g')
    .attr('transform', `translate(${width - marginRight}, 0)`)
    .call(yAxis)
    .attr('font-family', 'inherit')
    .call(g => g.selectAll('.domain').remove())
    .call(g => g.selectAll('.tick line')
      .attr('stroke-opacity', 0.50)
      .clone()
      .attr('x2', chartWidth * -1)
      .attr('stroke-opacity', 0.05))

  const areaPath = svg.append('path')
    .attr('fill', 'url(#areaGradient)')
    .attr('d', area(I))

  const definedPath = svg.append('path')
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', strokeWidth)
    .attr('stroke-opacity', 0.9)
    .attr('stroke-dasharray', '1, 4')
    .attr('d', line(I.filter(i => D[i])))

  const linePath = svg.append('path')
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', strokeWidth)
    .attr('stroke-linecap', strokeLinecap)
    .attr('stroke-linejoin', strokeLinejoin)
    .attr('stroke-opacity', strokeOpacity)
    .attr('d', line(I))

  const live = svg.append('g')
    .style('pointer-events', 'none')
    .attr('transform', `translate(${width - marginRight}, ${yScale(Y[total - 1])})`)

  live.selectAll('line')
    .data([null])
    .join('line')
    .attr('fill', 'none')
    .attr('stroke-width', 0.5)
    .attr('stroke', color)
    .attr('stroke-opacity', 1)
    .attr('stroke-dasharray', '2, 2')
    .attr('x1', chartWidth * -1)
    .attr('x2', 0)
    .attr('y1', 0)
    .attr('y2', 0)

  live.selectAll('rect')
    .data([null])
    .join('rect')
    .attr('rx', 2)
    .attr('ry', 2)
    .attr('x', 0)
    .attr('fill', color)

  live.selectAll('text')
    .data([price(total - 1)])
    .join('text')
    .attr('fill', 'white')
    .attr('font-size', '10px')
    .attr('font-weight', 'bold')
    .attr('x', ax)
    .attr('y', 4)
    .text(d => d)

  setTimeout(() => {
    const livetextBox = live.selectAll('text').node().getBBox()
    live.selectAll('rect')
      .attr('y', ((livetextBox.height + 4) * -1) / 2)
      .attr('width', livetextBox.width + (ax * 2))
      .attr('height', livetextBox.height + 4)
  }, 100)

  const tooltip = svg.append('g')
    .style('pointer-events', 'none')

  const pricetip = svg.append('g')
    .style('pointer-events', 'none')

  const datetip = svg.append('g')
    .style('pointer-events', 'none')

  const pointermoved = (event) => {
    const i = d3.bisectCenter(X, xScale.invert(d3.pointer(event)[0]))
    const sx = xScale(X[i])
    const sy = yScale(Y[i])

    tooltip
      .style('display', null)
      .attr('transform', `translate(${sx}, ${sy})`)
    pricetip
      .style('display', null)
      .attr('transform', `translate(${sx}, ${sy})`)
    datetip
      .style('display', null)
      .attr('transform', `translate(${sx}, ${sy})`)

    const rect = tooltip.selectAll('rect')
      .data([null])
      .join('rect')
      .attr('rx', 6)
      .attr('ry', 6)
      .attr('fill', 'white')
      .attr('filter', 'url(#dropShadow)')

    const text = tooltip.selectAll('text')
      .data([null])
      .join('text')
      .call(text => text
        .selectAll('tspan')
        .data(title(i))
        .join('tspan')
        .attr('x', (_, i) => i === 1 ? 100 : 0)
        .attr('y', (_, i) => i === 2 ? '1.5em' : 0)
        .attr('font-size', (_, i) => i === 2 ? '0.82em' : '0.7em')
        .attr('font-weight', (_, i) => i === 2 ? 'bold' : 'normal')
        .text(d => d))

    const {
      x,
      y,
      width: w,
      height: h
    } = text.node().getBBox()

    const rx = (w + sx + px) >= (chartWidth - mx)
    const tx = rx ? (-w - px + mx) : (mx + (px / 2))
    const cx = rx ? (-w - px - mx) : mx

    text.attr('transform', `translate(${tx}, ${-y - h - py})`)

    rect.attr('x', cx)
    rect.attr('y', -y - (h + py) - (mx * 2))
    rect.attr('width', w + px)
    rect.attr('height', h + py)

    tooltip.selectAll('line')
      .data([null, null])
      .join('line')
      .attr('fill', 'none')
      .attr('stroke-width', 0.5)
      .attr('stroke', 'black')
      .attr('stroke-opacity', 0.5)
      .attr('stroke-dasharray', '2, 2')
      .attr('x1', (_, i) => i ? (width - sx - marginRight) : x)
      .attr('x2', (_, i) => i ? 0 : x)
      .attr('y1', (_, i) => i ? 0 : (height - marginBottom - sy))
      .attr('y2', (_, i) => i ? 0 : 0)

    tooltip.selectAll('circle')
      .data([null])
      .join('circle')
      .attr('r', 3)
      .attr('cx', x)
      .attr('fill', color)
      .attr('cy', y + 11)

    pricetip.selectAll('text')
      .remove()
    pricetip.selectAll('rect')
      .remove()

    datetip.selectAll('text')
      .remove()
    datetip.selectAll('rect')
      .remove()

    const pricerect = pricetip.selectAll('rect')
      .data([null])
      .join('rect')
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('fill', '#efeff4')

    pricetip.selectAll('text')
      .data([null])
      .join('text')
      .attr('y', -y - 7)
      .attr('x', chartWidth - sx + ax)
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .text(price(i))

    const pricetipBox = pricetip.node().getBBox()

    pricerect
      .attr('width', (pricetipBox.width + (ax * 2)))
      .attr('height', (pricetipBox.height + 4))
      .attr('y', ((pricetipBox.height + 4) * -1) / 2)
      .attr('x', chartWidth - sx)

    const daterect = datetip.selectAll('rect')
      .data([null])
      .join('rect')
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('fill', '#efeff4')
      .attr('y', height - marginBottom - sy)

    const datetext = datetip.selectAll('text')
      .data([null])
      .join('text')
      .attr('y', height - marginBottom - sy + 13)
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .text(date(i))

    const datetipBox = datetip.node().getBBox()
    let datex = (datetipBox.width * -1) / 2
    datex = (sx + datex + datetipBox.width + ax) > chartWidth ? (chartWidth - sx - datetipBox.width - ax) : (sx > (datex + datetipBox.width + ax) ? datex : datetipBox.x - sx + ax)

    datetext
      .attr('x', datex)

    daterect
      .attr('width', (datetipBox.width + (ax * 2)))
      .attr('height', (datetipBox.height + 4))
      .attr('x', datex - ax)
  }

  const pointerleft = () => {
    tooltip.style('display', 'none')
    pricetip.style('display', 'none')
    datetip.style('display', 'none')
  }

  svg.on('pointerenter pointermove', pointermoved)
    .on('pointerleave', pointerleft)
    .on('touchstart', event => event.preventDefault(), {
      passive: true
    })

  const update = (tick) => {
    const now = new Date().getTime()
    const closedAt = X[total - 1]

    if ((now - closedAt) >= interval) {
      data.splice(0, 1)
      data.push([(closedAt + interval), tick])
    } else {
      data.splice(-1, 1, [closedAt, tick])
    }

    init()

    gx.transition()
      .duration(duration)
      .ease(ease)
      .call(xAxis)
    gx.call(g => g.selectAll('.domain').remove())

    gy.transition()
      .duration(duration)
      .ease(ease)
      .call(yAxis)
    gy.call(g => g.selectAll('.domain').remove())

    linePath.transition()
      .duration(duration)
      .ease(ease)
      .attr('d', line(I))
    definedPath.transition()
      .duration(duration)
      .ease(ease)
      .attr('d', line(I.filter(i => D[i])))
    areaPath.transition()
      .duration(duration)
      .ease(ease)
      .attr('d', area(I))

    live.transition()
      .duration(duration)
      .each(ease)
      .attr('transform', `translate(${width - marginRight}, ${yScale(Y[total - 1])})`)

    live.selectAll('text')
      .text([price(total - 1)])
  }

  d3.select(element).append(() => svg.node())

  return {
    update: update
  }
}
