import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, CalendarDays, CheckCircle2, ChevronRight, Clock3, Download, Dumbbell,
  Minus, PlayCircle, Plus, RotateCcw, Search, Star, TimerReset, Trash2
} from 'lucide-react';

const STORAGE_KEY = 'mi-entreno-pro-flow-v3';

const workoutPlan = {
  'Día 1': [
    { name: 'Press banca', muscle: 'Pecho', defaultSets: 3, repGoal: '6-8', rest: 90, videoQuery: 'press banca tecnica' },
    { name: 'Remo en polea', muscle: 'Espalda', defaultSets: 3, repGoal: '8-10', rest: 90, videoQuery: 'remo en polea tecnica' },
    { name: 'Press inclinado con mancuernas', muscle: 'Pecho superior', defaultSets: 2, repGoal: '8-12', rest: 90, videoQuery: 'press inclinado mancuernas tecnica' },
    { name: 'Jalón al pecho', muscle: 'Espalda', defaultSets: 2, repGoal: '10-12', rest: 90, videoQuery: 'jalon al pecho tecnica' },
    { name: 'Elevaciones laterales', muscle: 'Hombro', defaultSets: 2, repGoal: '12-15', rest: 60, videoQuery: 'elevaciones laterales tecnica' },
    { name: 'Tríceps en polea', muscle: 'Tríceps', defaultSets: 2, repGoal: '10-15', rest: 60, videoQuery: 'triceps polea tecnica' }
  ],
  'Día 2': [
    { name: 'Prensa', muscle: 'Pierna', defaultSets: 3, repGoal: '8-12', rest: 120, videoQuery: 'prensa de piernas tecnica' },
    { name: 'Sentadilla en multipower', muscle: 'Cuádriceps', defaultSets: 2, repGoal: '8-10', rest: 120, videoQuery: 'sentadilla multipower tecnica' },
    { name: 'Extensión de cuádriceps', muscle: 'Cuádriceps', defaultSets: 3, repGoal: '12-15', rest: 75, videoQuery: 'extension cuadriceps tecnica' },
    { name: 'Femoral sentado', muscle: 'Femoral', defaultSets: 2, repGoal: '10-15', rest: 75, videoQuery: 'femoral sentado tecnica' },
    { name: 'Gemelos', muscle: 'Gemelos', defaultSets: 3, repGoal: '10-15', rest: 60, videoQuery: 'gemelos maquina tecnica' },
    { name: 'Abdominales en máquina', muscle: 'Core', defaultSets: 2, repGoal: '12-15', rest: 60, videoQuery: 'abdominales maquina tecnica' }
  ],
  'Día 3': [
    { name: 'Jalón al pecho', muscle: 'Espalda', defaultSets: 3, repGoal: '8-12', rest: 90, videoQuery: 'jalon al pecho tecnica' },
    { name: 'Press militar con mancuernas', muscle: 'Hombro', defaultSets: 3, repGoal: '6-10', rest: 120, videoQuery: 'press militar mancuernas tecnica' },
    { name: 'Remo máquina', muscle: 'Espalda', defaultSets: 2, repGoal: '8-12', rest: 90, videoQuery: 'remo maquina tecnica' },
    { name: 'Face pull', muscle: 'Deltoide posterior', defaultSets: 2, repGoal: '12-15', rest: 60, videoQuery: 'face pull tecnica' },
    { name: 'Curl bíceps', muscle: 'Bíceps', defaultSets: 2, repGoal: '10-15', rest: 60, videoQuery: 'curl biceps tecnica' },
    { name: 'Tríceps polea', muscle: 'Tríceps', defaultSets: 2, repGoal: '10-15', rest: 60, videoQuery: 'triceps polea tecnica' }
  ],
  'Día 4': [
    { name: 'Hip thrust máquina', muscle: 'Glúteo', defaultSets: 3, repGoal: '8-12', rest: 120, videoQuery: 'hip thrust maquina tecnica' },
    { name: 'Peso muerto rumano', muscle: 'Femoral/Glúteo', defaultSets: 3, repGoal: '6-10', rest: 120, videoQuery: 'peso muerto rumano tecnica' },
    { name: 'Femoral de pie', muscle: 'Femoral', defaultSets: 2, repGoal: '10-15', rest: 75, videoQuery: 'femoral de pie tecnica' },
    { name: 'Zancada búlgara', muscle: 'Pierna', defaultSets: 2, repGoal: '8-12', rest: 90, videoQuery: 'zancada bulgara tecnica' },
    { name: 'Lumbares máquina', muscle: 'Lumbar', defaultSets: 2, repGoal: '12-15', rest: 60, videoQuery: 'extension lumbar maquina tecnica' },
    { name: 'Core / plancha', muscle: 'Core', defaultSets: 2, repGoal: 'Tiempo', rest: 45, videoQuery: 'plancha abdominal tecnica' }
  ],
  'Día 5': [
    { name: 'Press inclinado', muscle: 'Pecho', defaultSets: 3, repGoal: '8-12', rest: 90, videoQuery: 'press inclinado tecnica' },
    { name: 'Remo polea', muscle: 'Espalda', defaultSets: 3, repGoal: '8-12', rest: 90, videoQuery: 'remo polea tecnica' },
    { name: 'Elevaciones laterales', muscle: 'Hombro', defaultSets: 2, repGoal: '12-20', rest: 60, videoQuery: 'elevaciones laterales tecnica' },
    { name: 'Pájaros / deltoide posterior', muscle: 'Hombro posterior', defaultSets: 2, repGoal: '12-20', rest: 60, videoQuery: 'pajaros deltoide posterior tecnica' },
    { name: 'Curl martillo', muscle: 'Bíceps', defaultSets: 2, repGoal: '10-15', rest: 60, videoQuery: 'curl martillo tecnica' },
    { name: 'Curl en polea', muscle: 'Bíceps', defaultSets: 2, repGoal: '10-15', rest: 60, videoQuery: 'curl polea tecnica' },
    { name: 'Tríceps cuerda', muscle: 'Tríceps', defaultSets: 3, repGoal: '10-15', rest: 60, videoQuery: 'triceps cuerda tecnica' }
  ]
};

const todayString = () => new Date().toISOString().slice(0, 10);
const formatSeconds = (total) => `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
const buildSets = (n) => Array.from({ length: n }, () => ({ weight: '', reps: '', done: false }));
const createInitialState = () => ({ logsByDate: {}, notesByDate: {}, favorites: {} });

function ensureExerciseRecord(state, date, day, exercise) {
  return state.logsByDate?.[date]?.[day]?.[exercise.name] || {
    sets: buildSets(exercise.defaultSets),
    completed: false,
    rest: exercise.rest,
    notes: ''
  };
}

export default function App() {
  const [state, setState] = useState(createInitialState);
  const [selectedDate, setSelectedDate] = useState(todayString());
  const [selectedDay, setSelectedDay] = useState('Día 1');
  const [activeExercise, setActiveExercise] = useState(null);
  const [search, setSearch] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(90);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setState({ ...createInitialState(), ...JSON.parse(saved) }); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  const dayExercises = useMemo(() => {
    const base = workoutPlan[selectedDay] || [];
    const term = search.trim().toLowerCase();
    return term ? base.filter((e) => e.name.toLowerCase().includes(term) || e.muscle.toLowerCase().includes(term)) : base;
  }, [selectedDay, search]);

  const getExerciseRecord = (day, exercise) => ensureExerciseRecord(state, selectedDate, day, exercise);

  const updateExerciseRecord = (day, exercise, updater) => {
    setState((prev) => {
      const current = ensureExerciseRecord(prev, selectedDate, day, exercise);
      const updated = typeof updater === 'function' ? updater(current) : updater;
      return {
        ...prev,
        logsByDate: {
          ...prev.logsByDate,
          [selectedDate]: {
            ...prev.logsByDate[selectedDate],
            [day]: {
              ...(prev.logsByDate[selectedDate]?.[day] || {}),
              [exercise.name]: updated
            }
          }
        }
      };
    });
  };

  const openExercise = (exercise) => {
    const record = getExerciseRecord(selectedDay, exercise);
    setActiveExercise(exercise);
    setTimerRunning(false);
    setTimerSeconds(record.rest || exercise.rest || 90);
  };

  const finishExercise = () => {
    if (!activeExercise) return;
    updateExerciseRecord(selectedDay, activeExercise, (current) => ({ ...current, completed: true }));
    setActiveExercise(null);
    setTimerRunning(false);
  };

  const toggleFavorite = (name) => setState((prev) => ({ ...prev, favorites: { ...prev.favorites, [name]: !prev.favorites[name] } }));
  const dayNotes = state.notesByDate?.[selectedDate]?.[selectedDay] || '';
  const updateDayNotes = (value) => setState((prev) => ({ ...prev, notesByDate: { ...prev.notesByDate, [selectedDate]: { ...prev.notesByDate[selectedDate], [selectedDay]: value } } }));
  const completedCount = (workoutPlan[selectedDay] || []).filter((exercise) => getExerciseRecord(selectedDay, exercise).completed).length;

  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mi-entreno-pro-datos.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    const clean = createInitialState();
    setState(clean);
    setActiveExercise(null);
    setTimerRunning(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
  };

  if (activeExercise) {
    const record = getExerciseRecord(selectedDay, activeExercise);
    return (
      <div className="app-shell"><div className="container" style={{maxWidth: 760}}>
        <div className="hero">
          <div className="screen-header">
            <button className="btn ghost" style={{width:'auto'}} onClick={() => { setActiveExercise(null); setTimerRunning(false); }}><ArrowLeft size={16} /> Volver</button>
            <div className="right">
              <div className="small" style={{color:'#9ca3af'}}>{selectedDay} · {selectedDate}</div>
              <div className="hero-title" style={{fontSize: 26}}>{activeExercise.name}</div>
            </div>
          </div>
          <div className="top-tools">
            <span className="badge dark">{activeExercise.muscle}</span>
            <span className="badge">Objetivo {activeExercise.repGoal}</span>
          </div>
        </div>

        <div className="card">
          <div className="exercise-top">
            <div className="timer-box">
              <div className="small">Temporizador</div>
              <div className="timer-number">{formatSeconds(timerSeconds)}</div>
            </div>
            <div>
              <div className="actions" style={{justifyContent:'flex-end', marginBottom:8}}>
                <button className="btn icon-btn" onClick={() => setTimerSeconds((s) => Math.max(0, s - 15))}><Minus size={16} /></button>
                <button className="btn icon-btn" onClick={() => setTimerSeconds((s) => s + 15)}><Plus size={16} /></button>
              </div>
              <div className="actions">
                <button className="btn primary" style={{width:'auto'}} onClick={() => setTimerRunning((v) => !v)}><Clock3 size={16} /> {timerRunning ? 'Pausar' : 'Iniciar'}</button>
                <button className="btn secondary" style={{width:'auto'}} onClick={() => { setTimerRunning(false); setTimerSeconds(record.rest || activeExercise.rest); }}><RotateCcw size={16} /> Reset</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="exercise-top">
            <div>
              <div className="exercise-name">Series</div>
              <div className="small">Añade o quita series. El registro se queda guardado al volver a entrar.</div>
            </div>
            <div className="actions">
              <button className="btn secondary" style={{width:'auto'}} onClick={() => updateExerciseRecord(selectedDay, activeExercise, (current) => ({ ...current, sets: current.sets.length > 1 ? current.sets.slice(0, -1) : current.sets }))}><Minus size={16} /> Quitar</button>
              <button className="btn secondary" style={{width:'auto'}} onClick={() => updateExerciseRecord(selectedDay, activeExercise, (current) => ({ ...current, sets: [...current.sets, { weight: '', reps: '', done: false }] }))}><Plus size={16} /> Añadir</button>
            </div>
          </div>
          <div className="sets">
            {record.sets.map((setItem, idx) => (
              <div className="set-card" key={idx}>
                <div className="set-row">
                  <div className="exercise-name" style={{fontSize: 18}}>Serie {idx + 1}</div>
                  <button
                    className={`btn ${setItem.done ? 'success' : 'secondary'}`}
                    style={{width:'auto'}}
                    onClick={() => updateExerciseRecord(selectedDay, activeExercise, (current) => ({
                      ...current,
                      sets: current.sets.map((s, i) => i === idx ? { ...s, done: !s.done } : s)
                    }))}
                  >
                    <CheckCircle2 size={16} /> {setItem.done ? 'Hecha' : 'Marcar'}
                  </button>
                </div>
                <div className="fields">
                  <div>
                    <div className="small">Peso</div>
                    <input className="input" value={setItem.weight} placeholder="60" onChange={(e) => updateExerciseRecord(selectedDay, activeExercise, (current) => ({ ...current, sets: current.sets.map((s, i) => i === idx ? { ...s, weight: e.target.value } : s) }))} />
                  </div>
                  <div>
                    <div className="small">Reps</div>
                    <input className="input" value={setItem.reps} placeholder={activeExercise.repGoal} onChange={(e) => updateExerciseRecord(selectedDay, activeExercise, (current) => ({ ...current, sets: current.sets.map((s, i) => i === idx ? { ...s, reps: e.target.value } : s) }))} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="exercise-name" style={{marginBottom: 10}}>Notas del ejercicio</div>
          <textarea className="textarea" value={record.notes} placeholder="Técnica, sensaciones, molestias..." onChange={(e) => updateExerciseRecord(selectedDay, activeExercise, (current) => ({ ...current, notes: e.target.value }))} />
          <div className="footer-grid" style={{marginTop: 12}}>
            <button className="btn secondary" onClick={() => { window.location.href = `https://m.youtube.com/results?search_query=${encodeURIComponent(activeExercise.videoQuery)}`; }}><PlayCircle size={16} /> Ver vídeo</button>
            <button className="btn secondary" onClick={() => toggleFavorite(activeExercise.name)}><Star size={16} /> {state.favorites[activeExercise.name] ? 'Favorito' : 'Marcar favorito'}</button>
            <button className="btn primary" onClick={finishExercise}><CheckCircle2 size={16} /> Terminar ejercicio</button>
          </div>
        </div>
      </div></div>
    );
  }

  return (
    <div className="app-shell"><div className="container">
      <div className="hero">
        <div className="hero-top">
          <div>
            <div style={{display:'flex', alignItems:'center', gap:8}}><Dumbbell size={20} color="#a3e635" /><h1 className="hero-title">Mi Entreno Pro</h1></div>
            <div className="hero-sub">Elige el día, entra en el ejercicio y registra cada serie.</div>
          </div>
          <div className="header-actions">
            <input className="input" style={{width:170, background:'#111827', color:'white', borderColor:'#374151'}} type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            <button className="btn secondary" style={{width:'auto'}} onClick={exportData}><Download size={16} /> Exportar</button>
            <button className="btn ghost" style={{width:'auto'}} onClick={resetAll}><Trash2 size={16} /> Reset</button>
          </div>
        </div>
      </div>

      <div className="sidebar-layout">
        <div style={{display:'grid', gap:16}}>
          <div className="card">
            <div className="small" style={{marginBottom:10, fontWeight:600, color:'#111827'}}><Search size={14} style={{verticalAlign:'middle', marginRight:6}} /> Buscar</div>
            <input className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="press, espalda, bíceps..." />
          </div>
          <div className="card">
            <div style={{display:'grid', gap:8}}>
              {Object.keys(workoutPlan).map((day) => (
                <button key={day} className={`day-button ${selectedDay === day ? 'active' : ''}`} onClick={() => setSelectedDay(day)}><CalendarDays size={16} style={{verticalAlign:'middle', marginRight:8}} /> {day}</button>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="small">Progreso del día</div>
            <div className="metric">{completedCount}/{(workoutPlan[selectedDay] || []).length}</div>
            <div className="small">ejercicios terminados</div>
          </div>
        </div>

        <div style={{display:'grid', gap:16}}>
          <div className="card">
            <div className="exercise-top">
              <div>
                <div className="hero-title" style={{fontSize: 26, color:'#111827'}}>{selectedDay}</div>
                <div className="small">Pulsa un ejercicio para entrar en su pantalla.</div>
              </div>
              <span className="badge dark">{selectedDate}</span>
            </div>
            <div className="exercise-list" style={{marginTop:16}}>
              {dayExercises.map((exercise) => {
                const record = getExerciseRecord(selectedDay, exercise);
                const doneSets = record.sets.filter((s) => s.done).length;
                return (
                  <button className="exercise-item" key={exercise.name} onClick={() => openExercise(exercise)}>
                    <div className="exercise-top">
                      <div style={{flex:1, minWidth:0}}>
                        <div style={{display:'flex', gap:8, alignItems:'center', flexWrap:'wrap'}}>
                          <div className="exercise-name">{exercise.name}</div>
                          <span className="badge">{exercise.muscle}</span>
                          {state.favorites[exercise.name] ? <Star size={14} className="star" fill="currentColor" /> : null}
                        </div>
                        <div className="chips" style={{marginTop:10}}>
                          <span className="chip">{record.sets.length} series</span>
                          <span className="chip">objetivo {exercise.repGoal}</span>
                          <span className="chip">descanso {record.rest || exercise.rest}s</span>
                          <span className={`chip ${record.completed ? 'done' : ''}`}>{record.completed ? 'hecho' : `${doneSets} series hechas`}</span>
                        </div>
                      </div>
                      <ChevronRight size={20} color="#9ca3af" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="card">
            <div className="exercise-name" style={{fontSize:22, marginBottom:10}}>Notas del día</div>
            <textarea className="textarea" value={dayNotes} onChange={(e) => updateDayNotes(e.target.value)} placeholder="Cómo te has visto hoy, qué subirías, molestias, sensaciones..." />
          </div>
        </div>
      </div>
    </div></div>
  );
}
