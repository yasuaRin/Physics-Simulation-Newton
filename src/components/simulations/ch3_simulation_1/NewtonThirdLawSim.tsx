import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Typography,
  Slider,
  Button,
  IconButton,
  Card,
  CardContent,
  Stack,
  Chip,
  Fade,
  Grow,
  Tooltip,
  useMediaQuery,
  useTheme,
  Container,
  Divider,
  Alert,
} from '@mui/material';
import { 
  PlayArrow, 
  Replay,
  Info,
  Science,
  Rocket,
  Public,
  Build,
  Quiz,
  EmojiEvents,
  Star,
  FlashOn,
} from '@mui/icons-material';

const InteractiveForceCard = ({ 
  label, 
  value, 
  unit, 
  color,
  type,
  isActive,
}: { 
  label: string; 
  value: string; 
  unit: string; 
  color: string;
  type: 'action' | 'reaction';
  isActive: boolean;
}) => (
  <Grow in timeout={500}>
    <Card 
      sx={{ 
        minWidth: { xs: 100, sm: 130, md: 160 },
        maxWidth: { xs: 140, sm: 170, md: 200 },
        bgcolor: 'background.paper',
        border: `3px solid ${color}`,
        borderRadius: 3,
        boxShadow: isActive ? `0 8px 24px ${color}50` : `0 4px 12px ${color}20`,
        transform: isActive ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.3s ease-in-out',
        overflow: 'visible',
      }}
    >
      <CardContent sx={{ p: { xs: 1.2, sm: 1.5, md: 1.8 }, '&:last-child': { pb: { xs: 1.2, sm: 1.5, md: 1.8 } } }}>
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'text.secondary',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontSize: { xs: '0.55rem', sm: '0.6rem' },
            display: 'block',
            mb: 0.6,
          }}
        >
          {label}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.6, mb: 1 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color,
              fontWeight: 800,
              fontFamily: 'monospace',
              lineHeight: 1,
              fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' },
            }}
          >
            {value}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              fontFamily: 'monospace',
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
            }}
          >
            {unit}
          </Typography>
        </Box>
        <Chip
          label={type === 'action' ? 'Action Force' : 'Reaction Force'}
          size="small"
          sx={{
            height: { xs: 18, sm: 22 },
            fontSize: { xs: '0.55rem', sm: '0.6rem' },
            fontWeight: 700,
            bgcolor: `${color}20`,
            color: color,
            border: `2px solid ${color}`,
          }}
        />
      </CardContent>
    </Card>
  </Grow>
);

const QuizPanel = ({ type, onComplete }: { type: 'hammer' | 'orbit'; onComplete: (points: number) => void }) => {
  const [open, setOpen] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const questions = type === 'hammer' 
    ? [
        {
          question: "What happens to the nail when the hammer strikes it?",
          options: [
            "Only the nail moves downward",
            "Both hammer and nail experience equal forces",
            "The hammer loses all its force",
            "The nail pushes back with less force"
          ],
          correct: 1,
          points: 10,
          explanation: "According to Newton's Third Law, both objects experience equal and opposite forces."
        },
        {
          question: "If you double the hammer's mass, what happens to the impact force?",
          options: [
            "Force stays the same",
            "Force doubles",
            "Force halves",
            "Force quadruples"
          ],
          correct: 1,
          points: 15,
          explanation: "Force = mass × acceleration. Double the mass means double the force."
        }
      ]
    : [
        {
          question: "What happens to gravitational force if Earth's mass doubles?",
          options: [
            "Force stays the same",
            "Force doubles",
            "Force halves",
            "Force quadruples"
          ],
          correct: 1,
          points: 10,
          explanation: "Gravitational force is proportional to mass (F ∝ m). Double mass means double force."
        },
        {
          question: "What happens if the distance between Earth and Moon is doubled?",
          options: [
            "Force doubles",
            "Force stays the same",
            "Force becomes 1/4",
            "Force becomes 1/2"
          ],
          correct: 2,
          points: 15,
          explanation: "Gravitational force is inversely proportional to distance squared (F ∝ 1/r²). Double distance means 1/4 force."
        }
      ];

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setPointsEarned(0);
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    
    const question = questions[currentQuestion];
    if (index === question.correct) {
      const points = question.points;
      setPointsEarned(points);
      onComplete(points);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setOpen(false);
        setQuizStarted(false);
      }
    }, 2500);
  };

  const handleClose = () => {
    setOpen(false);
    setQuizStarted(false);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Tooltip title="Take a quick quiz!" arrow placement="left">
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{
            bgcolor: '#ff9800',
            color: 'white',
            width: { xs: 36, sm: 40 },
            height: { xs: 36, sm: 40 },
            '&:hover': {
              bgcolor: '#f57c00',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s',
            boxShadow: 2,
          }}
        >
          <Quiz sx={{ fontSize: { xs: 18, sm: 20 } }} />
        </IconButton>
      </Tooltip>

      {open && (
        <Fade in timeout={300}>
          <Paper
            sx={{
              position: 'absolute',
              bottom: { xs: 42, sm: 48 },
              right: 0,
              width: { xs: 280, sm: 320 },
              p: { xs: 1.8, sm: 2.2 },
              borderRadius: 3,
              border: '2px solid #ff9800',
              boxShadow: 8,
              zIndex: 1000,
              bgcolor: 'background.paper',
            }}
          >
            {!quizStarted ? (
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <EmojiEvents sx={{ color: '#ff9800', fontSize: 22 }} />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#ff9800',
                      fontWeight: 700,
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  >
                    Physics Challenge
                  </Typography>
                </Stack>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    fontSize: { xs: '0.75rem', sm: '0.85rem' },
                  }}
                >
                  Test your understanding of Newton's Third Law! Earn stars for correct answers.
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    startIcon={<FlashOn />}
                    onClick={handleStartQuiz}
                    sx={{
                      flex: 1,
                      bgcolor: '#ff9800',
                      fontWeight: 700,
                      fontSize: { xs: '0.75rem', sm: '0.85rem' },
                      '&:hover': { bgcolor: '#f57c00' },
                    }}
                  >
                    Start Challenge
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={{
                      borderColor: '#ff9800',
                      color: '#ff9800',
                      fontSize: { xs: '0.75rem', sm: '0.85rem' },
                    }}
                  >
                    Close
                  </Button>
                </Stack>
              </Stack>
            ) : (
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'primary.main',
                      fontWeight: 700,
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  >
                    Question {currentQuestion + 1}/{questions.length}
                  </Typography>
                  <Chip
                    icon={<Star sx={{ fontSize: 14 }} />}
                    label={pointsEarned}
                    size="small"
                    sx={{
                      bgcolor: '#ff9800',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                    }}
                  />
                </Stack>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 600,
                    fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  }}
                >
                  {questions[currentQuestion].question}
                </Typography>
                <Stack spacing={1}>
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === index ? "contained" : "outlined"}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                      sx={{
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        fontSize: { xs: '0.75rem', sm: '0.85rem' },
                        py: 0.8,
                        bgcolor: showResult 
                          ? index === questions[currentQuestion].correct 
                            ? '#4caf50' 
                            : selectedAnswer === index 
                              ? '#f44336' 
                              : 'transparent'
                          : selectedAnswer === index 
                            ? 'primary.main' 
                            : 'transparent',
                        color: showResult 
                          ? index === questions[currentQuestion].correct || selectedAnswer === index 
                            ? 'white' 
                            : 'text.primary'
                          : selectedAnswer === index 
                            ? 'white' 
                            : 'text.primary',
                        borderColor: selectedAnswer === index ? 'primary.main' : 'divider',
                        '&:hover': {
                          bgcolor: selectedAnswer === index ? 'primary.dark' : 'action.hover',
                        },
                      }}
                    >
                      {option}
                    </Button>
                  ))}
                </Stack>
                {showResult && (
                  <Fade in>
                    <Stack spacing={1}>
                      <Alert 
                        severity={selectedAnswer === questions[currentQuestion].correct ? "success" : "error"}
                        sx={{ 
                          py: 0.5,
                          fontSize: { xs: '0.75rem', sm: '0.85rem' },
                        }}
                      >
                        {selectedAnswer === questions[currentQuestion].correct 
                          ? `Correct! +${questions[currentQuestion].points} stars` 
                          : "Incorrect"}
                      </Alert>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 1.2,
                          bgcolor: 'grey.50',
                          borderRadius: 1.5,
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary',
                            fontSize: { xs: '0.7rem', sm: '0.8rem' },
                            lineHeight: 1.5,
                          }}
                        >
                          <Box component="span" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            Explanation: 
                          </Box> {questions[currentQuestion].explanation}
                        </Typography>
                      </Paper>
                      {currentQuestion === questions.length - 1 && (
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.primary',
                            fontWeight: 600,
                            textAlign: 'center',
                            fontSize: { xs: '0.75rem', sm: '0.85rem' },
                          }}
                        >
                          Quiz completed! Total stars: {pointsEarned}
                        </Typography>
                      )}
                    </Stack>
                  </Fade>
                )}
              </Stack>
            )}
          </Paper>
        </Fade>
      )}
    </Box>
  );
};

const InfoPanel = ({ type }: { type: 'hammer' | 'orbit' }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const content = type === 'hammer' 
    ? {
        title: 'Contact Force (Impact)',
        formula: 'F = m × a',
        description: 'When the hammer strikes the nail, both objects push on each other with equal force but in opposite directions.',
        points: [
          'The hammer pushes the nail downward (action)',
          'The nail pushes the hammer upward (reaction)',
          'Both forces are always equal in size',
          'The forces act on different objects'
        ]
      }
    : {
        title: 'Gravitational Force',
        formula: 'F = G(m₁m₂)/r²',
        description: 'Earth and Moon attract each other with equal gravitational forces, even though they are not touching.',
        points: [
          'Earth pulls the Moon toward it (action)',
          'Moon pulls Earth toward it (reaction)',
          'The forces depend on both masses',
          'Greater distance means weaker forces'
        ]
      };

  return (
    <Box sx={{ position: 'relative' }}>
      <Tooltip title="Learn about the physics" arrow placement={isMobile ? 'bottom' : 'left'}>
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            width: { xs: 36, sm: 40 },
            height: { xs: 36, sm: 40 },
            '&:hover': {
              bgcolor: 'primary.dark',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s',
            boxShadow: 2,
          }}
        >
          <Info sx={{ fontSize: { xs: 18, sm: 20 } }} />
        </IconButton>
      </Tooltip>

      {open && (
        <Fade in timeout={300}>
          <Paper
            sx={{
              position: 'absolute',
              bottom: { xs: 42, sm: 48 },
              right: 0,
              width: { xs: 280, sm: 320 },
              p: { xs: 1.8, sm: 2.2 },
              borderRadius: 3,
              border: '2px solid primary.main',
              boxShadow: 8,
              zIndex: 1000,
              bgcolor: 'background.paper',
            }}
          >
            <Stack spacing={1.5}>
              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'primary.main',
                    fontWeight: 700,
                    mb: 0.5,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                >
                  {content.title}
                </Typography>
                <Box sx={{ 
                  bgcolor: 'grey.50', 
                  p: { xs: 1, sm: 1.2 }, 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  my: 1,
                }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      color: 'primary.main',
                      textAlign: 'center',
                      fontSize: { xs: '0.95rem', sm: '1.1rem' },
                    }}
                  >
                    {content.formula}
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                  }}
                >
                  {content.description}
                </Typography>
              </Box>

              <Divider />

              <Stack spacing={0.8}>
                {content.points.map((point, i) => (
                  <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                    <Box
                      sx={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        bgcolor: i % 2 === 0 ? 'error.main' : 'primary.main',
                        mt: 0.75,
                        flexShrink: 0,
                      }}
                    />
                    <Typography 
                      variant="body2"
                      sx={{ 
                        color: 'text.primary',
                        lineHeight: 1.5,
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        flex: 1,
                      }}
                    >
                      {point}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Paper>
        </Fade>
      )}
    </Box>
  );
};

const InteractiveSlider = ({
  label,
  value,
  onChange,
  min,
  max,
  unit,
  color,
  disabled,
  icon,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  unit: string;
  color: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <Paper
      elevation={focused ? 2 : 0}
      sx={{
        p: { xs: 1.5, sm: 1.8 },
        bgcolor: focused ? 'grey.50' : 'background.paper',
        borderRadius: 2,
        border: `2px solid ${focused ? color : 'divider'}`,
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: color,
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
        <Stack direction="row" spacing={1} alignItems="center">
          {icon && (
            <Box sx={{ 
              color: color, 
              display: 'flex',
              '& .MuiSvgIcon-root': {
                fontSize: { xs: 16, sm: 18 }
              }
            }}>
              {icon}
            </Box>
          )}
          <Typography 
            variant="body2"
            sx={{ 
              fontWeight: 700, 
              color: 'text.primary', 
              fontSize: { xs: '0.75rem', sm: '0.85rem' } 
            }}
          >
            {label}
          </Typography>
        </Stack>
        <Chip
          label={`${value} ${unit}`}
          size="small"
          sx={{
            fontWeight: 800,
            fontFamily: 'monospace',
            bgcolor: `${color}15`,
            color: color,
            height: { xs: 22, sm: 24 },
            fontSize: { xs: '0.7rem', sm: '0.8rem' },
            border: `2px solid ${color}`,
          }}
        />
      </Stack>
      <Slider
        value={value}
        onChange={(_, v) => onChange(v as number)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        min={min}
        max={max}
        disabled={disabled}
        sx={{ 
          color: color,
          height: 6,
          '& .MuiSlider-thumb': {
            width: { xs: 18, sm: 20 },
            height: { xs: 18, sm: 20 },
            transition: 'all 0.2s',
            '&:hover, &.Mui-focusVisible': {
              boxShadow: `0 0 0 8px ${color}20`,
            },
            '&.Mui-active': {
              boxShadow: `0 0 0 12px ${color}30`,
            },
          },
          '& .MuiSlider-track': {
            border: 'none',
          },
          '& .MuiSlider-rail': {
            opacity: 0.3,
            bgcolor: 'grey.400',
          },
        }}
      />
      <Stack direction="row" justifyContent="space-between" mt={1}>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem' }}>
          {min} {unit}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem' }}>
          {max} {unit}
        </Typography>
      </Stack>
    </Paper>
  );
};

const HammerSimulation = () => {
  const [mass, setMass] = useState(5);
  const [velocity, setVelocity] = useState(5);
  const [isStriking, setIsStriking] = useState(false);
  const [impactData, setImpactData] = useState({ force: 0, active: false });
  const [userPoints, setUserPoints] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const stateRef = useRef({
    hammerY: 100,
    nailY: 300,
    phase: 'idle',
    impactTimer: 0,
    targetNailY: 300,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const GROUND_Y = 350;
  const NAIL_HEAD_Y_INITIAL = 300;

  const calculateForce = () => Math.round(mass * velocity * 20);

  const handleStrike = () => {
    if (isStriking) return;
    setIsStriking(true);
    stateRef.current.phase = 'down';
    setImpactData({ force: 0, active: false });
  };

  const reset = () => {
    setIsStriking(false);
    stateRef.current = {
      hammerY: 100,
      nailY: NAIL_HEAD_Y_INITIAL,
      phase: 'idle',
      impactTimer: 0,
      targetNailY: NAIL_HEAD_Y_INITIAL,
    };
    setImpactData({ force: 0, active: false });
  };

  const handleQuizComplete = (points: number) => {
    setUserPoints(prev => prev + points);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);
  };

  const drawArrow = (
    ctx: CanvasRenderingContext2D, 
    fromX: number, 
    fromY: number, 
    toX: number, 
    toY: number, 
    color: string, 
    label: string
  ) => {
    const headlen = 14;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 6;
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;
    
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillText(label, toX + 22, (fromY + toY) / 2);
  };

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas;
    const state = stateRef.current;
    
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, GROUND_Y, width, height - GROUND_Y);
    ctx.fillStyle = '#A0522D';
    for (let i = 0; i < width; i += 40) {
      ctx.fillRect(i, GROUND_Y, 20, height - GROUND_Y);
    }

    const nailX = width / 2;
    const nailHeight = 60;
    const currentNailY = state.nailY;
    
    ctx.fillStyle = '#94a3b8';
    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(0,0,0,0.35)';
    ctx.fillRect(nailX - 5, currentNailY, 10, nailHeight);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(nailX - 12, currentNailY, 24, 8);
    ctx.shadowBlur = 0;

    let hammerY = state.hammerY;
    const targetY = currentNailY - 40;

    if (state.phase === 'down') {
      const speed = velocity * 2;
      state.hammerY += speed;
      if (state.hammerY >= targetY) {
        state.hammerY = targetY;
        state.phase = 'contact';
        state.impactTimer = 0;
        const forceVal = calculateForce();
        setImpactData({ force: forceVal, active: true });
        const depth = Math.min(30, forceVal / 50);
        state.targetNailY = Math.min(GROUND_Y - 10, state.nailY + depth);
      }
    } else if (state.phase === 'contact') {
      state.impactTimer++;
      if (state.nailY < state.targetNailY) {
        state.nailY += 2;
        state.hammerY += 2;
      }
      if (state.impactTimer > 40) {
        state.phase = 'up';
        setImpactData(prev => ({ ...prev, active: false }));
      }
    } else if (state.phase === 'up') {
      state.hammerY -= 5;
      if (state.hammerY <= 100) {
        state.hammerY = 100;
        state.phase = 'idle';
        setIsStriking(false);
      }
    }
    hammerY = state.hammerY;

    ctx.fillStyle = '#475569';
    ctx.shadowBlur = 12;
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.fillRect(nailX - 30, hammerY, 60, 40);
    ctx.fillStyle = '#d97706';
    ctx.fillRect(nailX - 5, hammerY - 80, 10, 80);
    ctx.shadowBlur = 0;

    if (state.phase === 'contact') {
      const forceMag = calculateForce();
      const arrowLength = Math.min(120, forceMag / 10);
      drawArrow(ctx, nailX + 40, currentNailY, nailX + 40, currentNailY + arrowLength, '#ef4444', 'Action');
      drawArrow(ctx, nailX - 40, currentNailY, nailX - 40, currentNailY - arrowLength, '#1976d2', 'Reaction');
    }
  }, [mass, velocity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      draw(ctx);
      animationRef.current = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationRef.current);
  }, [draw]);

  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        height: '100%',
        gap: { xs: 2, md: 0 },
      }}>
        <Paper 
          elevation={0}
          sx={{ 
            width: { xs: '100%', md: 340 },
            p: { xs: 1.5, sm: 2, md: 2.5 },
            overflowY: 'auto',
            bgcolor: 'background.paper',
            borderRight: { md: '2px solid' },
            borderBottom: { xs: '2px solid', md: 'none' },
            borderColor: 'divider',
            order: { xs: 2, md: 1 },
            height: { xs: 'auto', md: '100%' },
            maxHeight: { xs: '45vh', md: '100%' },
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
            <Build sx={{ color: 'primary.main', fontSize: { xs: 20, sm: 24 } }} />
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.primary',
                fontWeight: 700,
                fontSize: { xs: '1rem', sm: '1.1rem' },
              }}
            >
              Example 1: Contact Force
            </Typography>
          </Stack>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              lineHeight: 1.6,
              mb: 2.5,
              fontSize: { xs: '0.75rem', sm: '0.85rem' },
            }}
          >
            Adjust the hammer's properties and observe equal action-reaction forces during impact.
          </Typography>
          
          <Stack spacing={2}>
            <InteractiveSlider
              label="Hammer Mass"
              value={mass}
              onChange={setMass}
              min={1}
              max={10}
              unit="kg"
              color="#1565c0"
              disabled={isStriking}
              icon={<Build />}
            />
            
            <InteractiveSlider
              label="Swing Speed"
              value={velocity}
              onChange={setVelocity}
              min={1}
              max={10}
              unit="m/s"
              color="#f57c00"
              disabled={isStriking}
              icon={<Rocket />}
            />
          </Stack>
          
          <Stack direction="row" spacing={1.5} mt={3}>
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              onClick={handleStrike}
              disabled={isStriking}
              fullWidth
              size={isMobile ? 'small' : 'medium'}
              sx={{
                py: { xs: 1, sm: 1.2 },
                fontWeight: 700,
                fontSize: { xs: '0.75rem', sm: '0.85rem' },
                bgcolor: 'primary.main',
                textTransform: 'none',
                borderRadius: 2,
                boxShadow: 2,
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
                '&:disabled': {
                  bgcolor: 'grey.400',
                },
                transition: 'all 0.2s',
              }}
            >
              {isStriking ? 'Striking...' : 'Strike Nail'}
            </Button>
            <Button 
              variant="outlined" 
              onClick={reset} 
              disabled={isStriking}
              size={isMobile ? 'small' : 'medium'}
              sx={{ 
                minWidth: { xs: 48, sm: 56 },
                borderWidth: 2,
                borderColor: 'primary.main',
                color: 'primary.main',
                fontWeight: 700,
                borderRadius: 2,
                '&:hover': {
                  borderWidth: 2,
                  borderColor: 'primary.dark',
                  bgcolor: 'primary.light',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s',
              }}
            >
              <Replay />
            </Button>
          </Stack>

          <Paper
            elevation={1}
            sx={{ 
              mt: 3, 
              p: { xs: 1.5, sm: 2 }, 
              bgcolor: 'grey.50',
              borderRadius: 2,
              border: '2px solid',
              borderColor: 'divider',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 700,
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                }}
              >
                Expected Force
              </Typography>
              <Chip
                icon={<Star sx={{ fontSize: 12 }} />}
                label={userPoints}
                size="small"
                sx={{
                  bgcolor: '#ff9800',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  height: 24,
                }}
              />
            </Stack>
            <Stack direction="row" alignItems="baseline" spacing={1}>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 800,
                  fontFamily: 'monospace',
                  fontSize: { xs: '1.4rem', sm: '1.6rem', md: '1.8rem' },
                }}
              >
                {calculateForce()}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                }}
              >
                N
              </Typography>
            </Stack>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.disabled',
                display: 'block',
                mt: 0.5,
                fontSize: { xs: '0.65rem', sm: '0.7rem' },
              }}
            >
              Both objects will experience this force
            </Typography>
          </Paper>
        </Paper>
        
        <Box sx={{ 
          flex: 1, 
          position: 'relative', 
          bgcolor: 'grey.50',
          height: { xs: '55vh', md: '100%' },
          minHeight: { xs: 350, sm: 450 },
          order: { xs: 1, md: 2 },
        }}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 1.5 }}
            alignItems="center"
            justifyContent="center"
            sx={{ 
              position: 'absolute', 
              top: { xs: 8, sm: 12 }, 
              left: { xs: 8, sm: 12 },
              right: { xs: 8, sm: 'auto' },
              zIndex: 10,
              width: { xs: 'calc(100% - 16px)', sm: 'auto' },
            }}
          >
            <InteractiveForceCard 
              label="Force on Nail" 
              value={impactData.active ? `${impactData.force}` : '0'} 
              unit="N"
              color="#ef4444"
              type="action"
              isActive={impactData.active}
            />
            <Typography 
              variant="h3"
              sx={{
                color: 'primary.main',
                fontWeight: 800,
                mx: { xs: 0, sm: 1.5 },
                my: { xs: 0.5, sm: 0 },
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
              }}
            >
              =
            </Typography>
            <InteractiveForceCard 
              label="Force on Hammer" 
              value={impactData.active ? `${impactData.force}` : '0'} 
              unit="N"
              color="#1976d2"
              type="reaction"
              isActive={impactData.active}
            />
          </Stack>

          <Stack 
            direction="row"
            spacing={1}
            sx={{ 
              position: 'absolute', 
              bottom: { xs: 8, sm: 12 }, 
              right: { xs: 8, sm: 12 }, 
              zIndex: 10 
            }}
          >
            <QuizPanel type="hammer" onComplete={handleQuizComplete} />
            <InfoPanel type="hammer" />
          </Stack>
          
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={600} 
            style={{ 
              width: '100%', 
              height: '100%', 
              display: 'block',
              objectFit: 'contain',
            }} 
          />
          
          {!isStriking && impactData.force === 0 && (
            <Fade in timeout={800}>
              <Paper
                sx={{
                  position: 'absolute',
                  bottom: { xs: 60, sm: 80 },
                  left: '50%',
                  transform: 'translateX(-50%)',
                  px: { xs: 2.5, sm: 3 },
                  py: { xs: 1, sm: 1.5 },
                  bgcolor: 'background.paper',
                  borderRadius: 3,
                  border: '3px solid',
                  borderColor: 'primary.main',
                  boxShadow: 6,
                  zIndex: 5,
                  width: { xs: '85%', sm: 'auto' },
                  maxWidth: 350,
                }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'primary.main',
                    fontWeight: 700,
                    textAlign: 'center',
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  }}
                >
                  Click "Strike Nail" to start the experiment!
                </Typography>
              </Paper>
            </Fade>
          )}

          {showCelebration && (
            <Fade in timeout={500}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20,
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: '#ff9800',
                    fontWeight: 800,
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    animation: 'bounce 1s infinite',
                    '@keyframes bounce': {
                      '0%, 100%': { transform: 'translateY(0)' },
                      '50%': { transform: 'translateY(-10px)' },
                    },
                  }}
                >
                  ⭐ Great Job! ⭐
                </Typography>
              </Box>
            </Fade>
          )}
        </Box>
      </Box>
    </Container>
  );
};

const OrbitSimulation = () => {
  const [earthMass, setEarthMass] = useState(5);
  const [moonMass, setMoonMass] = useState(2);
  const [distance, setDistance] = useState(200);
  const [userPoints, setUserPoints] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const angleRef = useRef(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const calculateGravity = () => {
    const G = 2000;
    return Math.round((G * earthMass * moonMass) / (distance * 0.5));
  };

  const handleQuizComplete = (points: number) => {
    setUserPoints(prev => prev + points);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);
  };

  const drawArrow = (
    ctx: CanvasRenderingContext2D, 
    fromX: number, 
    fromY: number, 
    toX: number, 
    toY: number, 
    color: string, 
    label: string
  ) => {
    const headlen = 16;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 7;
    ctx.shadowBlur = 15;
    ctx.shadowColor = color;
    
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.fillStyle = color;
    ctx.fillText(label, toX + Math.cos(angle) * 28, toY + Math.sin(angle) * 28);
  };

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    
    ctx.clearRect(0, 0, width, height);
    
    angleRef.current += 0.005 + (100 / distance) * 0.005;
    
    const earthRadius = 20 + earthMass * 4;
    const moonX = centerX + Math.cos(angleRef.current) * distance;
    const moonY = centerY + Math.sin(angleRef.current) * distance;
    const moonRadius = 10 + moonMass * 2;
    
    ctx.beginPath();
    ctx.strokeStyle = '#78909c';
    ctx.setLineDash([8, 8]);
    ctx.lineWidth = 2;
    ctx.arc(centerX, centerY, distance, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.setLineDash([]);
    
    ctx.beginPath();
    ctx.strokeStyle = '#90a4ae';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(moonX, moonY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    const forceMag = calculateGravity();
    const arrowLength = Math.min(distance - earthRadius - moonRadius, forceMag / 5);
    
    const angleToEarth = Math.atan2(centerY - moonY, centerX - moonX);
    drawArrow(
      ctx, 
      moonX, 
      moonY, 
      moonX + Math.cos(angleToEarth) * arrowLength, 
      moonY + Math.sin(angleToEarth) * arrowLength, 
      '#ef4444', 
      'Action'
    );
    
    const angleToMoon = Math.atan2(moonY - centerY, moonX - centerX);
    drawArrow(
      ctx, 
      centerX, 
      centerY, 
      centerX + Math.cos(angleToMoon) * arrowLength, 
      centerY + Math.sin(angleToMoon) * arrowLength, 
      '#1976d2', 
      'Reaction'
    );
    
    ctx.beginPath();
    ctx.fillStyle = '#1976d2';
    ctx.shadowBlur = 30;
    ctx.shadowColor = 'rgba(25, 118, 210, 0.5)';
    ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🌍', centerX, centerY);
    
    ctx.beginPath();
    ctx.fillStyle = '#90a4ae';
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(144, 164, 174, 0.4)';
    ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('🌕', moonX, moonY);
  }, [earthMass, moonMass, distance]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      draw(ctx);
      animationRef.current = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationRef.current);
  }, [draw]);

  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        height: '100%',
        gap: { xs: 2, md: 0 },
      }}>
        <Paper 
          elevation={0}
          sx={{ 
            width: { xs: '100%', md: 340 },
            p: { xs: 1.5, sm: 2, md: 2.5 },
            overflowY: 'auto',
            bgcolor: 'background.paper',
            borderRight: { md: '2px solid' },
            borderBottom: { xs: '2px solid', md: 'none' },
            borderColor: 'divider',
            order: { xs: 2, md: 1 },
            height: { xs: 'auto', md: '100%' },
            maxHeight: { xs: '45vh', md: '100%' },
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
            <Public sx={{ color: 'primary.main', fontSize: { xs: 20, sm: 24 } }} />
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.primary',
                fontWeight: 700,
                fontSize: { xs: '1rem', sm: '1.1rem' },
              }}
            >
              Example 2: Gravitational Force
            </Typography>
          </Stack>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              lineHeight: 1.6,
              mb: 2.5,
              fontSize: { xs: '0.75rem', sm: '0.85rem' },
            }}
          >
            Explore how gravitational forces act equally between Earth and Moon, even at a distance.
          </Typography>
          
          <Stack spacing={2}>
            <InteractiveSlider
              label="Earth Mass"
              value={earthMass}
              onChange={setEarthMass}
              min={1}
              max={10}
              unit="× 10²⁴ kg"
              color="#1976d2"
              icon={<Public />}
            />
            
            <InteractiveSlider
              label="Moon Mass"
              value={moonMass}
              onChange={setMoonMass}
              min={1}
              max={10}
              unit="× 10²² kg"
              color="#607d8b"
              icon={<Public sx={{ transform: 'scale(0.8)' }} />}
            />
            
            <InteractiveSlider
              label="Distance"
              value={distance}
              onChange={setDistance}
              min={120}
              max={350}
              unit="× 10⁶ m"
              color="#43a047"
              icon={<Rocket />}
            />
          </Stack>

          <Paper
            elevation={1}
            sx={{ 
              mt: 3, 
              p: { xs: 1.5, sm: 2 }, 
              bgcolor: 'grey.50',
              borderRadius: 2,
              border: '2px solid',
              borderColor: 'divider',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 700,
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                }}
              >
                Gravitational Force
              </Typography>
              <Chip
                icon={<Star sx={{ fontSize: 12 }} />}
                label={userPoints}
                size="small"
                sx={{
                  bgcolor: '#ff9800',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  height: 24,
                }}
              />
            </Stack>
            <Stack direction="row" alignItems="baseline" spacing={1}>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 800,
                  fontFamily: 'monospace',
                  fontSize: { xs: '1.4rem', sm: '1.6rem', md: '1.8rem' },
                }}
              >
                {calculateGravity()}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                }}
              >
                N
              </Typography>
            </Stack>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.disabled',
                display: 'block',
                mt: 0.5,
                fontSize: { xs: '0.65rem', sm: '0.7rem' },
              }}
            >
              Equal force on both Earth and Moon
            </Typography>
          </Paper>
        </Paper>
        
        <Box sx={{ 
          flex: 1, 
          position: 'relative', 
          bgcolor: '#0a1929',
          height: { xs: '55vh', md: '100%' },
          minHeight: { xs: 350, sm: 450 },
          order: { xs: 1, md: 2 },
        }}>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 1.5 }}
            alignItems="center"
            justifyContent="center"
            sx={{ 
              position: 'absolute', 
              top: { xs: 8, sm: 12 }, 
              left: { xs: 8, sm: 12 },
              right: { xs: 8, sm: 'auto' },
              zIndex: 10,
              width: { xs: 'calc(100% - 16px)', sm: 'auto' },
            }}
          >
            <InteractiveForceCard 
              label="Force on Moon" 
              value={`${calculateGravity()}`} 
              unit="N"
              color="#ef4444"
              type="action"
              isActive={true}
            />
            <Typography 
              variant="h3"
              sx={{
                color: 'white',
                fontWeight: 800,
                mx: { xs: 0, sm: 1.5 },
                my: { xs: 0.5, sm: 0 },
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
              }}
            >
              =
            </Typography>
            <InteractiveForceCard 
              label="Force on Earth" 
              value={`${calculateGravity()}`} 
              unit="N"
              color="#1976d2"
              type="reaction"
              isActive={true}
            />
          </Stack>

          <Stack 
            direction="row"
            spacing={1}
            sx={{ 
              position: 'absolute', 
              bottom: { xs: 8, sm: 12 }, 
              right: { xs: 8, sm: 12 }, 
              zIndex: 10 
            }}
          >
            <QuizPanel type="orbit" onComplete={handleQuizComplete} />
            <InfoPanel type="orbit" />
          </Stack>

          <canvas 
            ref={canvasRef} 
            width={800} 
            height={600} 
            style={{ 
              width: '100%', 
              height: '100%', 
              display: 'block',
              objectFit: 'contain',
            }} 
          />

          <Paper
            elevation={8}
            sx={{
              position: 'absolute',
              bottom: { xs: 60, sm: 80 },
              right: { xs: '50%', sm: 24 },
              transform: { xs: 'translateX(50%)', sm: 'none' },
              px: { xs: 1.5, sm: 2 },
              py: { xs: 1, sm: 1.2 },
              bgcolor: 'background.paper',
              borderRadius: 3,
              border: '3px solid',
              borderColor: 'primary.main',
              boxShadow: 6,
              zIndex: 5,
              width: { xs: '85%', sm: 'auto' },
              maxWidth: 240,
              textAlign: 'center',
            }}
          >
            <Typography 
              variant="h6"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 800,
                color: 'primary.main',
                fontSize: { xs: '0.8rem', sm: '0.95rem' },
              }}
            >
              F ∝ (m₁ × m₂) / r²
            </Typography>
          </Paper>

          {showCelebration && (
            <Fade in timeout={500}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20,
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: '#ff9800',
                    fontWeight: 800,
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    animation: 'bounce 1s infinite',
                    '@keyframes bounce': {
                      '0%, 100%': { transform: 'translateY(0)' },
                      '50%': { transform: 'translateY(-10px)' },
                    },
                  }}
                >
                  ⭐ Great Job! ⭐
                </Typography>
              </Box>
            </Fade>
          )}
        </Box>
      </Box>
    </Container>
  );
};

const NewtonThirdLawSim: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hammer' | 'orbit'>('hammer');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        overflow: 'hidden',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 1.5, sm: 2.5 },
          bgcolor: 'primary.main',
          borderRadius: 0,
          borderBottom: '4px solid',
          borderColor: 'primary.dark',
        }}
      >
        <Stack 
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1.5, sm: 2.5 }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={1.2}>
            <Science sx={{ color: 'white', fontSize: { xs: 28, sm: 36 } }} />
            <Box>
              <Typography 
                variant={isMobile ? 'h5' : 'h4'} 
                sx={{ 
                  color: 'white',
                  fontWeight: 800,
                  mb: 0.5,
                  fontSize: { xs: '1.25rem', sm: '1.75rem' },
                }}
              >
                Newton's Third Law
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 500,
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                }}
              >
                For every action, there is an equal and opposite reaction
              </Typography>
            </Box>
          </Stack>
          
          <Tabs
            value={activeTab === 'hammer' ? 0 : 1}
            onChange={(_, v) => setActiveTab(v === 0 ? 'hammer' : 'orbit')}
            variant={isMobile ? 'fullWidth' : 'standard'}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              bgcolor: 'rgba(255,255,255,0.1)',
              borderRadius: 2,
              p: 0.3,
              minHeight: { xs: 40, sm: 44 },
              border: '2px solid rgba(255,255,255,0.2)',
              '& .MuiTab-root': {
                color: 'rgba(255,255,255,0.8)',
                fontWeight: 700,
                textTransform: 'none',
                fontSize: { xs: '0.75rem', sm: '0.85rem' },
                minHeight: { xs: 36, sm: 40 },
                px: { xs: 1.5, sm: 2 },
                borderRadius: 1.2,
                transition: 'all 0.2s',
                '&.Mui-selected': {
                  color: 'primary.main',
                  bgcolor: 'white',
                  boxShadow: 1,
                }
              },
              '& .MuiTabs-indicator': {
                display: 'none',
              }
            }}
          >
            <Tab 
              label={isMobile ? "Contact Force" : "Example 1: Contact Force"} 
              icon={isMobile ? <Build sx={{ fontSize: 16 }} /> : undefined}
              iconPosition="start"
            />
            <Tab 
              label={isMobile ? "Gravitational" : "Example 2: Gravitational"} 
              icon={isMobile ? <Public sx={{ fontSize: 16 }} /> : undefined}
              iconPosition="start"
            />
          </Tabs>
        </Stack>
      </Paper>

      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        {activeTab === 'hammer' ? <HammerSimulation /> : <OrbitSimulation />}
      </Box>
    </Box>
  );
};

export default NewtonThirdLawSim;