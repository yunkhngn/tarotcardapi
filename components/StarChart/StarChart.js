/**
 * StarChart Component
 * Professional natal chart with enhanced visuals
 */

import { useMemo, useRef, useImperativeHandle, forwardRef } from 'react';
import {
  ZODIAC_SIGNS,
  normalizeAngle,
  formatZodiacPosition,
  getZodiacSign,
  getSignDegree,
} from '../../utils/astronomy';

// Chart dimensions
const WIDTH = 1100;
const HEIGHT = 700;
const CHART_CENTER_X = 320;
const CHART_CENTER_Y = 350;
const OUTER_RADIUS = 260;
const ZODIAC_RING_WIDTH = 45;
const DEGREE_RING_WIDTH = 18;
const HOUSE_RING_WIDTH = 25;
const INNER_RADIUS = OUTER_RADIUS - ZODIAC_RING_WIDTH - DEGREE_RING_WIDTH - HOUSE_RING_WIDTH;
const PLANET_RADIUS = INNER_RADIUS - 40;

// Colors
const COLORS = {
  background: '#ffffff',
  zodiacOuter: '#6b8cbe',
  zodiacInner: '#8fafd4',
  degreeRing: '#a8c4e0',
  zodiacBorder: '#4a6fa5',
  houseArea: '#f5f7fa',
  houseBorder: '#c8d4e3',
  text: '#2c3e50',
  textLight: '#7f8c8d',
  signBox: '#9b59b6',
  signBoxBorder: '#8e44ad',
  aspects: {
    conjunction: '#e74c3c',
    opposition: '#c0392b',
    trine: '#3498db',
    square: '#9b59b6',
    sextile: '#27ae60',
  },
};

const SIGN_ELEMENTS = [
  'fire', 'earth', 'air', 'water',
  'fire', 'earth', 'air', 'water',
  'fire', 'earth', 'air', 'water',
];

function calculateAspects(planets) {
  const aspects = [];
  const aspectTypes = [
    { name: 'conjunction', angle: 0, symbol: '☌', orb: 10 },
    { name: 'sextile', angle: 60, symbol: '⚹', orb: 6 },
    { name: 'square', angle: 90, symbol: '□', orb: 8 },
    { name: 'trine', angle: 120, symbol: '△', orb: 8 },
    { name: 'opposition', angle: 180, symbol: '☍', orb: 10 },
  ];
  
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const diff = Math.abs(planets[i].longitude - planets[j].longitude);
      const normalizedDiff = diff > 180 ? 360 - diff : diff;
      
      for (const aspect of aspectTypes) {
        if (Math.abs(normalizedDiff - aspect.angle) <= aspect.orb) {
          aspects.push({
            planet1: planets[i],
            planet2: planets[j],
            type: aspect.name,
            symbol: aspect.symbol,
          });
          break;
        }
      }
    }
  }
  return aspects;
}

function radialLine(cx, cy, innerRadius, outerRadius, angle) {
  const angleRad = (angle * Math.PI) / 180;
  return {
    x1: cx + innerRadius * Math.cos(angleRad),
    y1: cy - innerRadius * Math.sin(angleRad),
    x2: cx + outerRadius * Math.cos(angleRad),
    y2: cy - outerRadius * Math.sin(angleRad),
  };
}

function getPointOnCircle(cx, cy, radius, angle) {
  const angleRad = (angle * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy - radius * Math.sin(angleRad),
  };
}

function formatDate(input) {
  const { year, month, day, hour, minute, utcOffset } = input;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[month - 1]} ${day}, ${year} at ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} GMT${utcOffset >= 0 ? '+' : ''}${utcOffset}`;
}

const StarChart = forwardRef(function StarChart({ chartData }, ref) {
  const svgRef = useRef(null);
  
  useImperativeHandle(ref, () => ({
    getSVG: () => svgRef.current,
  }));
  
  const { asc, mc, houses, planets, input, latitude, longitude } = chartData;
  
  const aspects = useMemo(() => calculateAspects(planets), [planets]);
  
  const zodiacSegments = useMemo(() => {
    return ZODIAC_SIGNS.map((sign, i) => ({
      ...sign,
      startAngle: -(i * 30 - asc + 180),
      midAngle: -((i * 30 + 15) - asc + 180),
      element: SIGN_ELEMENTS[i],
    }));
  }, [asc]);
  
  const houseCuspLines = useMemo(() => {
    return houses.map((cusp, i) => ({
      houseNum: i + 1,
      cusp,
      angle: -(cusp - asc + 180),
    }));
  }, [houses, asc]);
  
  const planetPositions = useMemo(() => {
    return planets.map((planet) => {
      const angle = -(planet.longitude - asc + 180);
      const angleRad = (angle * Math.PI) / 180;
      
      return {
        ...planet,
        x: CHART_CENTER_X + PLANET_RADIUS * Math.cos(angleRad),
        y: CHART_CENTER_Y - PLANET_RADIUS * Math.sin(angleRad),
        angle,
        sign: getZodiacSign(planet.longitude),
        degree: Math.floor(getSignDegree(planet.longitude)),
        arcMinute: Math.floor((getSignDegree(planet.longitude) % 1) * 60),
      };
    });
  }, [planets, asc]);
  
  const mcAngle = -(mc - asc + 180);
  const ascAngle = 180;
  
  // Generate degree tick marks
  const degreeMarks = useMemo(() => {
    const marks = [];
    for (let i = 0; i < 360; i += 5) {
      const angle = -(i - asc + 180);
      const isMajor = i % 30 === 0;
      const innerR = OUTER_RADIUS - ZODIAC_RING_WIDTH - (isMajor ? DEGREE_RING_WIDTH : DEGREE_RING_WIDTH * 0.5);
      const outerR = OUTER_RADIUS - ZODIAC_RING_WIDTH;
      marks.push({ angle, isMajor, ...radialLine(CHART_CENTER_X, CHART_CENTER_Y, innerR, outerR, angle) });
    }
    return marks;
  }, [asc]);
  
  return (
    <svg
      ref={svgRef}
      width={WIDTH}
      height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: '100%', height: 'auto' }}
    >
      <defs>
        <linearGradient id="zodiacGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7b9fcf" />
          <stop offset="50%" stopColor="#5a82b3" />
          <stop offset="100%" stopColor="#7b9fcf" />
        </linearGradient>
        <linearGradient id="innerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e8eff7" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodOpacity="0.2"/>
        </filter>
        <filter id="innerShadow">
          <feOffset dx="0" dy="2"/>
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      
      {/* Background */}
      <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill={COLORS.background} />
      
      {/* Header */}
      <g>
        <text x="35" y="40" fill={COLORS.text} fontSize="20" fontWeight="bold" fontFamily="Georgia, serif">
          Natal Chart
        </text>
        <text x="35" y="62" fill={COLORS.textLight} fontSize="13" fontFamily="Arial, sans-serif">
          {input.name || 'Birth Chart'} | Placidus House System
        </text>
        <text x="35" y="82" fill={COLORS.textLight} fontSize="12" fontFamily="Arial, sans-serif">
          {formatDate(input)}
        </text>
        <text x="35" y="100" fill={COLORS.textLight} fontSize="12" fontFamily="Arial, sans-serif">
          {input.location || `${Math.abs(input.latitude || latitude).toFixed(2)}°${(input.latitude || latitude) >= 0 ? 'N' : 'S'}, ${Math.abs(input.longitude || longitude).toFixed(2)}°${(input.longitude || longitude) >= 0 ? 'E' : 'W'}`}
        </text>
      </g>
      
      {/* Main Chart Circle */}
      <g filter="url(#shadow)">
        {/* Outer zodiac ring */}
        <circle
          cx={CHART_CENTER_X}
          cy={CHART_CENTER_Y}
          r={OUTER_RADIUS}
          fill="url(#zodiacGrad)"
          stroke={COLORS.zodiacBorder}
          strokeWidth="3"
        />
        
        {/* Degree ring */}
        <circle
          cx={CHART_CENTER_X}
          cy={CHART_CENTER_Y}
          r={OUTER_RADIUS - ZODIAC_RING_WIDTH}
          fill={COLORS.degreeRing}
          stroke={COLORS.zodiacBorder}
          strokeWidth="1"
        />
        
        {/* House ring */}
        <circle
          cx={CHART_CENTER_X}
          cy={CHART_CENTER_Y}
          r={OUTER_RADIUS - ZODIAC_RING_WIDTH - DEGREE_RING_WIDTH}
          fill={COLORS.zodiacInner}
          stroke={COLORS.zodiacBorder}
          strokeWidth="1"
        />
        
        {/* Inner house area */}
        <circle
          cx={CHART_CENTER_X}
          cy={CHART_CENTER_Y}
          r={INNER_RADIUS}
          fill="url(#innerGrad)"
          stroke={COLORS.houseBorder}
          strokeWidth="1"
        />
      </g>
      
      {/* Degree tick marks */}
      {degreeMarks.map((mark, i) => (
        <line
          key={`tick-${i}`}
          x1={mark.x1} y1={mark.y1}
          x2={mark.x2} y2={mark.y2}
          stroke={mark.isMajor ? COLORS.zodiacBorder : 'rgba(74, 111, 165, 0.5)'}
          strokeWidth={mark.isMajor ? 1.5 : 0.5}
        />
      ))}
      
      {/* Zodiac sign boxes */}
      {zodiacSegments.map((sign, i) => {
        const pos = getPointOnCircle(CHART_CENTER_X, CHART_CENTER_Y, OUTER_RADIUS - ZODIAC_RING_WIDTH / 2, sign.midAngle);
        const boxSize = 28;
        
        return (
          <g key={sign.name}>
            {/* Sign divider line */}
            {(() => {
              const line = radialLine(
                CHART_CENTER_X, CHART_CENTER_Y,
                OUTER_RADIUS - ZODIAC_RING_WIDTH,
                OUTER_RADIUS,
                sign.startAngle
              );
              return (
                <line
                  x1={line.x1} y1={line.y1}
                  x2={line.x2} y2={line.y2}
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1"
                />
              );
            })()}
            
            {/* Sign box */}
            <rect
              x={pos.x - boxSize / 2}
              y={pos.y - boxSize / 2}
              width={boxSize}
              height={boxSize}
              rx="4"
              fill={COLORS.signBox}
              stroke={COLORS.signBoxBorder}
              strokeWidth="1"
            />
            <text
              x={pos.x}
              y={pos.y + 1}
              fill="#ffffff"
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="Georgia, serif"
            >
              {sign.symbol}
            </text>
          </g>
        );
      })}
      
      {/* House cusp lines */}
      {houseCuspLines.map((house) => {
        const isAngular = [1, 4, 7, 10].includes(house.houseNum);
        const line = radialLine(
          CHART_CENTER_X, CHART_CENTER_Y,
          isAngular ? 30 : INNER_RADIUS,
          OUTER_RADIUS - ZODIAC_RING_WIDTH - DEGREE_RING_WIDTH,
          house.angle
        );
        
        return (
          <line
            key={`house-${house.houseNum}`}
            x1={line.x1} y1={line.y1}
            x2={line.x2} y2={line.y2}
            stroke={isAngular ? COLORS.text : COLORS.houseBorder}
            strokeWidth={isAngular ? 2 : 1}
          />
        );
      })}
      
      {/* Aspect lines */}
      {aspects.map((aspect, i) => {
        const p1 = planetPositions.find(p => p.name === aspect.planet1.name);
        const p2 = planetPositions.find(p => p.name === aspect.planet2.name);
        if (!p1 || !p2) return null;
        
        return (
          <line
            key={`aspect-${i}`}
            x1={p1.x} y1={p1.y}
            x2={p2.x} y2={p2.y}
            stroke={COLORS.aspects[aspect.type]}
            strokeWidth="2"
            opacity="0.7"
            strokeLinecap="round"
          />
        );
      })}
      
      {/* Planets */}
      {planetPositions.map((planet) => (
        <g key={planet.name}>
          <circle
            cx={planet.x}
            cy={planet.y}
            r="14"
            fill="#ffffff"
            stroke={planet.color}
            strokeWidth="2.5"
          />
          <text
            x={planet.x}
            y={planet.y + 1}
            fill={planet.color}
            fontSize="15"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Georgia, serif"
          >
            {planet.symbol}
          </text>
        </g>
      ))}
      
      {/* ASC label */}
      <g>
        <text
          x={CHART_CENTER_X - OUTER_RADIUS - 30}
          y={CHART_CENTER_Y + 5}
          fill={COLORS.text}
          fontSize="14"
          fontWeight="bold"
          textAnchor="end"
          fontFamily="Arial, sans-serif"
        >
          ASC
        </text>
      </g>
      
      {/* MC label */}
      <g>
        {(() => {
          const pos = getPointOnCircle(CHART_CENTER_X, CHART_CENTER_Y, OUTER_RADIUS + 25, mcAngle);
          return (
            <text
              x={pos.x}
              y={pos.y}
              fill={COLORS.text}
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="Arial, sans-serif"
            >
              MC
            </text>
          );
        })()}
      </g>
      
      {/* Right Panel - Planet Positions */}
      <g transform="translate(620, 50)">
        <text fill={COLORS.text} fontSize="16" fontWeight="bold" fontFamily="Georgia, serif">
          Planet Positions
        </text>
        <line x1="0" y1="22" x2="200" y2="22" stroke={COLORS.houseBorder} strokeWidth="1" />
        
        {planetPositions.map((planet, i) => (
          <g key={planet.name} transform={`translate(0, ${40 + i * 30})`}>
            <circle cx="10" cy="0" r="10" fill="#fff" stroke={planet.color} strokeWidth="2" />
            <text x="10" y="1" fill={planet.color} fontSize="12" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" fontFamily="Georgia, serif">
              {planet.symbol}
            </text>
            <text x="30" fill={COLORS.text} fontSize="13" fontFamily="Arial, sans-serif" dominantBaseline="middle">
              {planet.name}
            </text>
            <text x="110" fill={COLORS.text} fontSize="13" fontFamily="Arial, sans-serif" dominantBaseline="middle">
              {planet.degree}° {planet.sign.abbr} {String(planet.arcMinute).padStart(2, '0')}'
            </text>
          </g>
        ))}
        
        <g transform={`translate(0, ${40 + planetPositions.length * 30 + 20})`}>
          <line x1="0" y1="-10" x2="200" y2="-10" stroke={COLORS.houseBorder} strokeWidth="1" />
          <text fill={COLORS.text} fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif">
            ASC
          </text>
          <text x="50" fill={COLORS.textLight} fontSize="12" fontFamily="Arial, sans-serif">
            Ascendant
          </text>
          <text x="130" fill={COLORS.text} fontSize="13" fontFamily="Arial, sans-serif">
            {formatZodiacPosition(asc)}
          </text>
        </g>
        
        <g transform={`translate(0, ${40 + planetPositions.length * 30 + 50})`}>
          <text fill={COLORS.text} fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif">
            MC
          </text>
          <text x="50" fill={COLORS.textLight} fontSize="12" fontFamily="Arial, sans-serif">
            Midheaven
          </text>
          <text x="130" fill={COLORS.text} fontSize="13" fontFamily="Arial, sans-serif">
            {formatZodiacPosition(mc)}
          </text>
        </g>
      </g>
      
      {/* Aspect Legend */}
      <g transform="translate(880, 50)">
        <text fill={COLORS.text} fontSize="16" fontWeight="bold" fontFamily="Georgia, serif">
          Aspects
        </text>
        <line x1="0" y1="22" x2="150" y2="22" stroke={COLORS.houseBorder} strokeWidth="1" />
        
        {[
          { name: 'Conjunction', symbol: '☌', type: 'conjunction' },
          { name: 'Opposition', symbol: '☍', type: 'opposition' },
          { name: 'Trine', symbol: '△', type: 'trine' },
          { name: 'Square', symbol: '□', type: 'square' },
          { name: 'Sextile', symbol: '⚹', type: 'sextile' },
        ].map((asp, i) => (
          <g key={asp.type} transform={`translate(0, ${40 + i * 28})`}>
            <text fill={COLORS.aspects[asp.type]} fontSize="16" fontFamily="Georgia, serif" dominantBaseline="middle">
              {asp.symbol}
            </text>
            <text x="30" fill={COLORS.text} fontSize="12" fontFamily="Arial, sans-serif" dominantBaseline="middle">
              {asp.name}
            </text>
          </g>
        ))}
      </g>
      
      {/* Footer */}
      <text
        x={WIDTH - 30}
        y={HEIGHT - 25}
        fill={COLORS.textLight}
        fontSize="11"
        textAnchor="end"
        fontFamily="Arial, sans-serif"
      >
        tarot.yunkhngn.dev
      </text>
    </svg>
  );
});

export default StarChart;
