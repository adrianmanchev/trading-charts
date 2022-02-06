import * as d3 from 'd3'

export default (data, {
  x = ([x]) => x,
  y = ([, y]) => parseFloat(y),
  curve = d3.curveMonotoneX,
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
  const chartHeight = height - marginTop - marginBottom

  const colors = {
    up: '#34c759',
    down: '#ff2d55',
    live: '#e5e5ea',
    tooltip: '#f2f2f7',
    crosshair: '#2c2c2e'
  }

  let X = null
  let Y = null
  let I = null

  let D = null

  let xDomain = null
  let yDomain = null

  let xScale = null
  let yScale = null

  let xAxis = null
  let yAxis = null

  let O = null

  const init = () => {
    X = d3.map(data, x)
    Y = d3.map(data, y)
    I = d3.map(data, (_, i) => i)

    D = d3.map(data, (d, i) => X[i] && Y[i])

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

    O = yScale(Y[0])
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
    .defined(line.defined())
    .curve(curve)
    .x(line.x())
    .y0(line.y())
    .y1(O)

  const UPDATE_AREA = s => s.attr('d', area(I))
  const UPDATE_LINE = s => s.attr('d', line(I))
  const UPDATE_DEFINED = s => s.attr('d', line(I.filter(i => D[i])))
  const UPDATE_TEXT = s => s.selectAll('text').text(price(total - 1))
  const UPDATE_TICK = s => s.attr('transform', `translate(${width - marginRight}, ${yScale(Y[total - 1])})`)

  const UPDATE_AREA_COLORS = s => s.selectAll('stop')
    .data([
      {
        offset: 0,
        color: colors.up
      },
      {
        offset: O / chartHeight,
        color: 'white'
      },
      {
        offset: 1,
        color: colors.down
      }
    ])
    .join('stop')
    .attr('offset', d => d.offset)
    .attr('stop-color', d => d.color)
    .attr('stop-opacity', 0.3)
  const UPDATE_STROKE_COLORS = s => s.selectAll('stop')
    .data([
      {
        offset: 0,
        color: colors.up
      },
      {
        offset: O / chartHeight,
        color: colors.up
      },
      {
        offset: O / chartHeight,
        color: colors.down
      },
      {
        offset: 1,
        color: colors.down
      }
    ])
    .join('stop')
    .attr('offset', d => d.offset)
    .attr('stop-color', d => d.color)

  const svg = d3.create('svg:svg')
    .attr('width', width)
    .attr('height', height)
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
    .style('-webkit-tap-highlight-color', 'transparent')
    .style('overflow', 'visible')

  const defs = svg.append('svg:defs')

  defs.append('filter')
    .attr('id', 'dropShadow')
    .append('feDropShadow')
    .attr('dx', 0)
    .attr('dy', 0.7)
    .attr('stdDeviation', 1)
    .attr('flood-opacity', 0.21)

  const linearGradient = defs.append('linearGradient')
    .attr('id', 'linearGradient')
    .attr('gradientUnits', 'userSpaceOnUse')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', chartHeight)
    .call(UPDATE_STROKE_COLORS)

  const areaGradient = defs.append('linearGradient')
    .attr('id', 'areaGradient')
    .attr('gradientUnits', 'userSpaceOnUse')
    .attr('x1', '0%')
    .attr('x2', '0%')
    .attr('y1', '0%')
    .attr('y2', '100%')
    .call(UPDATE_AREA_COLORS)

  const gx = svg.append('g')
    .attr('transform', `translate(0, ${height - marginBottom})`)
    .call(xAxis)
    .attr('font-family', 'inherit')
    .call(g => g.select('.domain').attr('stroke-width', 0))
    .call(g => g.selectAll('.tick line')
      .attr('stroke-opacity', 0.50))

  const gy = svg.append('g')
    .attr('transform', `translate(${width - marginRight}, 0)`)
    .call(yAxis)
    .attr('font-family', 'inherit')
    .call(g => g.select('.domain').attr('stroke-width', 0))
    .call(g => g.selectAll('.tick line')
      .attr('stroke-opacity', 0.50)
      .clone()
      .attr('x2', chartWidth * -1)
      .attr('stroke-opacity', 0.05))

  const areaPath = svg.append('path')
    .attr('fill', 'url(#areaGradient)')
    .call(UPDATE_AREA)

  const definedPath = svg.append('path')
    .attr('fill', 'none')
    .attr('stroke', colors.crosshair)
    .attr('stroke-width', strokeWidth)
    .attr('stroke-opacity', 0.21)
    .attr('stroke-dasharray', '1, 4')
    .call(UPDATE_DEFINED)

  const linePath = svg.append('path')
    .attr('fill', 'none')
    .attr('stroke', 'url(#linearGradient)')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-linecap', strokeLinecap)
    .attr('stroke-linejoin', strokeLinejoin)
    .attr('stroke-opacity', strokeOpacity)
    .call(UPDATE_LINE)

  const live = svg.append('g')
    .style('pointer-events', 'none')
    .call(UPDATE_TICK)

  live.selectAll('line')
    .data([null])
    .join('line')
    .attr('fill', 'none')
    .attr('stroke-width', 0.5)
    .attr('stroke', colors.crosshair)
    .attr('stroke-opacity', 0.5)
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
    .attr('fill', colors.live)

  live.selectAll('text')
    .data([null])
    .join('text')
    .attr('font-size', '10px')
    .attr('font-weight', 'bold')
    .attr('x', ax)
    .attr('y', 4)

  live.call(UPDATE_TEXT)
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
      .attr('stroke', colors.crosshair)
      .attr('stroke-opacity', 0.5)
      .attr('stroke-dasharray', '2, 2')
      .attr('x1', (_, i) => i ? (width - sx - marginRight) : x)
      .attr('x2', (_, i) => i ? 0 : x)
      .attr('y1', (_, i) => i ? 0 : (height - marginBottom - sy))
      .attr('y2', (_, i) => i ? 0 : 0)

    tooltip.selectAll('circle')
      .data([null])
      .join('circle')
      .attr('r', 4)
      .attr('cx', x)
      .attr('fill', sy >= O ? colors.down : colors.up)
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 1)
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
      .attr('fill', colors.tooltip)

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
      .attr('fill', colors.tooltip)
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

    area.y1(O)
    areaGradient.call(UPDATE_AREA_COLORS)
    linearGradient.call(UPDATE_STROKE_COLORS)

    gx.transition()
      .duration(duration)
      .call(xAxis)
    gy.transition()
      .duration(duration)
      .call(yAxis)

    areaPath.transition()
      .duration(duration)
      .call(UPDATE_AREA)
    definedPath.transition()
      .duration(duration)
      .call(UPDATE_DEFINED)
    linePath.transition()
      .duration(duration)
      .call(UPDATE_LINE)

    live.call(UPDATE_TEXT)
      .transition()
      .duration(duration)
      .call(UPDATE_TICK)
  }

  d3.select(element).append(() => svg.node())

  return {
    update: update
  }
}
