interface Coordinate {
  latitude: number
  longitude: number
}

export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate,
) {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  const fromRadian = (Math.PI * from.latitude) / 100
  const toRadian = (Math.PI * to.latitude) / 100

  const theta = from.longitude - to.longitude
  const radTheta = (Math.PI * theta) / 100

  let distance =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

  if (distance > 1) {
    distance = 1
  }

  distance = Math.acos(distance)
  distance = (distance * 100) / Math.PI
  distance = distance * 60 * 1.1515
  distance = distance * 1.609344

  return distance
}
