import React from 'react';
import ReactDOM from 'react-dom/client';
import { ArrowLeft, CalendarDays, CheckCircle2, ChevronRight, Clock3, Download, Dumbbell, Minus, PlayCircle, Plus, RotateCcw, Search, Star, TimerReset, Trash2 } from 'lucide-react';

const STORAGE_KEY = 'mi_entreno_pro_flow_v2';

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

const styles = {
  app: { minHeight: '100vh', background: '#f4f4f5', padding: 12 },
  container: { maxWidth: 1100, margin: '0 auto', display: 'grid', gap: 16 },
  darkCard: { background: '#111827', color: 'white', borderRadius: 28, padding: 16, boxShadow: '0 20px 40px rgba(0,0,0,.18)' },
  card: { background: 'white', borderRadius: 28, padding: 16, boxShadow: '0 4px 16px rgba(0,0,0,.06)' },
  btn: { border: '1px solid #e4e4e7', background: 'white', borderRadius: 18, padding: '10px 14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnDark: { border: 'none', background: '#111827', color: 'white', borderRadius: 18, padding: '10px 14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
  input: { width: '100%', borderRadius: 16, border: '1px solid #e4e4e7', padding: '10px 12px', background: '#fff' },
  textarea: { width: '100%', borderRadius: 16, border: '1px solid #e4e4e7', padding: 12, minHeight: 110, resize: 'vertical' },
  chip: { display: 'inline-block', background: '#f4f4f5', borderRadius: 999, padding: '6px 10px', fontSize: 12, color: '#52525b' }
};

function todayString() { return new Date().toISOString().slice(0, 10); }
function formatSeconds(total) { const m = Math.floor(total / 60); const s = total % 60; return `${m}:${String(s).padStart(2, '0')}`; }
function buildSets(n) { return Array.from({ length: n }, () => ({ weight: '', reps: '', done: false })); }
function createInitialState() { return { logsByDate: {}, notesByDate: {}, favorites: {} }; }
function ensureExerciseRecord(prev, date, day, exercise) {
  const existing = prev.logsByDate?.[date]?.[day]?.[exercise.name];
  if (existing) return existing;
  return { sets: buildSets(exercise.defaultSets), completed: false, rest: exercise.rest, notes: '' };
}

function App() {
  const [state, setState] = React.useState(createInitialState);
  const [selectedDate, setSelectedDate] = React.useState(todayString());
  const [selectedDay, setSelectedDay] = React.useState('Día 1');
  const [activeExercise, setActiveExercise] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [timerSeconds, setTimerSeconds] = React.useState(90);
  const [timerRunning, setTimerRunning] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setState({ ...createInitialState(), ...JSON.parse(saved) }); } catch {}
    }
  }, []);

  React.useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }, [state]);

  React.useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) { setTimerRunning(false); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  const dayExercises = React.useMemo(() => {
    const base = workoutPlan[selectedDay] || [];
    const term = search.trim().toLowerCase();
    if (!term) return base;
    return base.filter(e => e.name.toLowerCase().includes(term) || e.muscle.toLowerCase().includes(term));
  }, [selectedDay, search]);

  const getExerciseRecord = (day, exercise) => state.logsByDate?.[selectedDate]?.[day]?.[exercise.name] || { sets: buildSets(exercise.defaultSets), completed: false, rest: exercise.rest, notes: '' };

  const updateExerciseRecord = (day, exercise, updater) => {
    setState(prev => {
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

  const markExerciseDoneAndBack = () => {
    if (!activeExercise) return;
    updateExerciseRecord(selectedDay, activeExercise, current => ({ ...current, completed: true }));
    setActiveExercise(null);
    setTimerRunning(false);
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'mi-entreno-pro-datos.json'; a.click(); URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    const clean = createInitialState();
    setState(clean); setActiveExercise(null); setTimerRunning(false); localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
  };

  const toggleFavorite = (exerciseName) => setState(prev => ({ ...prev, favorites: { ...prev.favorites, [exerciseName]: !prev.favorites[exerciseName] } }));
  const updateDayNotes = (value) => setState(prev => ({ ...prev, notesByDate: { ...prev.notesByDate, [selectedDate]: { ...prev.notesByDate[selectedDate], [selectedDay]: value } } }));

  const dayNotes = state.notesByDate?.[selectedDate]?.[selectedDay] || '';
  const completedCount = (workoutPlan[selectedDay] || []).filter(exercise => getExerciseRecord(selectedDay, exercise).completed).length;

  if (activeExercise) {
    const record = getExerciseRecord(selectedDay, activeExercise);
    return <div style={styles.app}><div style={{maxWidth:800, margin:'0 auto', display:'grid', gap:16}}>
      <div style={styles.darkCard}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap'}}>
          <button style={{...styles.btn, background:'#111827', color:'white', border:'1px solid #3f3f46'}} onClick={() => { setActiveExercise(null); setTimerRunning(false); }}><ArrowLeft size={16}/> Volver</button>
          <div style={{textAlign:'right'}}><div style={{fontSize:14, color:'#a1a1aa'}}>{selectedDay} · {selectedDate}</div><div style={{fontSize:28, fontWeight:800}}>{activeExercise.name}</div></div>
        </div>
        <div style={{marginTop:12, display:'flex', gap:8, flexWrap:'wrap'}}>
          <span style={{...styles.chip, background:'white', color:'#111827'}}>{activeExercise.muscle}</span>
          <span style={{...styles.chip, background:'#18181b', color:'white', border:'1px solid #3f3f46'}}>Objetivo {activeExercise.repGoal}</span>
        </div>
      </div>

      <div style={styles.card}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, flexWrap:'wrap'}}>
          <div><div style={{fontSize:14, color:'#71717a', fontWeight:600}}>Temporizador de descanso</div><div style={{fontSize:56, fontWeight:800}}>{formatSeconds(timerSeconds)}</div></div>
          <div style={{display:'grid', gap:8}}>
            <div style={{display:'flex', justifyContent:'flex-end', gap:8}}>
              <button style={styles.btn} onClick={() => setTimerSeconds(s => Math.max(0, s - 15))}><Minus size={16}/></button>
              <button style={styles.btn} onClick={() => setTimerSeconds(s => s + 15)}><Plus size={16}/></button>
            </div>
            <div style={{display:'flex', gap:8}}>
              <button style={styles.btnDark} onClick={() => setTimerRunning(v => !v)}><Clock3 size={16}/> {timerRunning ? 'Pausar' : 'Iniciar'}</button>
              <button style={styles.btn} onClick={() => { setTimerRunning(false); setTimerSeconds(record.rest || activeExercise.rest); }}><RotateCcw size={16}/> Reset</button>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap', marginBottom:12}}>
          <div><div style={{fontSize:24, fontWeight:800}}>Series</div><div style={{fontSize:14, color:'#71717a'}}>Añade o quita series y guarda peso y repeticiones</div></div>
          <div style={{display:'flex', gap:8}}>
            <button style={styles.btn} onClick={() => updateExerciseRecord(selectedDay, activeExercise, current => ({ ...current, sets: current.sets.length > 1 ? current.sets.slice(0,-1) : current.sets }))}><Minus size={16}/> Quitar</button>
            <button style={styles.btn} onClick={() => updateExerciseRecord(selectedDay, activeExercise, current => ({ ...current, sets: [...current.sets, { weight:'', reps:'', done:false }] }))}><Plus size={16}/> Añadir</button>
          </div>
        </div>
        <div style={{display:'grid', gap:12}}>
          {record.sets.map((setItem, idx) => <div key={idx} style={{background:'#f4f4f5', border:'1px solid #e4e4e7', borderRadius:24, padding:16}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, marginBottom:12, flexWrap:'wrap'}}>
              <div style={{fontSize:20, fontWeight:800}}>Serie {idx+1}</div>
              <button style={setItem.done ? {...styles.btnDark, background:'#84cc16', color:'#111827'} : styles.btn} onClick={() => updateExerciseRecord(selectedDay, activeExercise, current => ({ ...current, sets: current.sets.map((s,i) => i===idx ? { ...s, done: !s.done } : s) }))}><CheckCircle2 size={16}/> {setItem.done ? 'Hecha' : 'Marcar'}</button>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:12}}>
              <div><div style={{fontSize:14, color:'#71717a', marginBottom:6}}>Peso</div><input value={setItem.weight} onChange={(e) => updateExerciseRecord(selectedDay, activeExercise, current => ({ ...current, sets: current.sets.map((s,i)=> i===idx ? { ...s, weight:e.target.value } : s) }))} placeholder="Ej: 60" style={styles.input}/></div>
              <div><div style={{fontSize:14, color:'#71717a', marginBottom:6}}>Reps</div><input value={setItem.reps} onChange={(e) => updateExerciseRecord(selectedDay, activeExercise, current => ({ ...current, sets: current.sets.map((s,i)=> i===idx ? { ...s, reps:e.target.value } : s) }))} placeholder={activeExercise.repGoal} style={styles.input}/></div>
            </div>
          </div>)}
        </div>
      </div>

      <div style={styles.card}>
        <div style={{fontSize:24, fontWeight:800, marginBottom:12}}>Notas del ejercicio</div>
        <textarea value={record.notes} onChange={(e) => updateExerciseRecord(selectedDay, activeExercise, current => ({ ...current, notes: e.target.value }))} placeholder="Técnica, sensaciones, molestias, próxima subida..." style={styles.textarea} />
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:8, marginTop:12}}>
          <button style={styles.btn} onClick={() => { window.location.href = `https://m.youtube.com/results?search_query=${encodeURIComponent(activeExercise.videoQuery)}`; }}><PlayCircle size={16}/> Ver vídeo</button>
          <button style={styles.btn} onClick={() => toggleFavorite(activeExercise.name)}><Star size={16}/> {state.favorites[activeExercise.name] ? 'Favorito' : 'Marcar favorito'}</button>
          <button style={styles.btnDark} onClick={markExerciseDoneAndBack}><CheckCircle2 size={16}/> Terminar ejercicio</button>
        </div>
      </div>
    </div></div>;
  }

  return <div style={styles.app}><div style={styles.container}>
    <div style={styles.darkCard}>
      <div style={{display:'flex', gap:12, alignItems:'center', justifyContent:'space-between', flexWrap:'wrap'}}>
        <div><div style={{display:'flex', alignItems:'center', gap:8}}><Dumbbell size={20} color="#84cc16"/><div style={{fontSize:30, fontWeight:800}}>Mi Entreno Pro</div></div><div style={{marginTop:4, fontSize:14, color:'#a1a1aa'}}>Elige el día, entra en el ejercicio y registra cada serie</div></div>
        <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{...styles.input, width:170, background:'#09090b', color:'white', border:'1px solid #3f3f46'}}/>
          <button style={{...styles.btn, background:'white'}} onClick={exportData}><Download size={16}/> Exportar</button>
          <button style={{...styles.btn, background:'#111827', color:'white', border:'1px solid #3f3f46'}} onClick={resetAll}><Trash2 size={16}/> Reset</button>
        </div>
      </div>
    </div>

    <div style={{display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))'}}>
      <div style={{display:'grid', gap:16}}>
        <div style={styles.card}><div style={{display:'flex', alignItems:'center', gap:8, fontSize:14, fontWeight:700, marginBottom:12}}><Search size={16}/> Buscar</div><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="press, espalda, bíceps..." style={{...styles.input, background:'#f4f4f5'}}/></div>
        <div style={styles.card}><div style={{display:'grid', gap:8}}>{Object.keys(workoutPlan).map(day => <button key={day} style={selectedDay===day ? styles.btnDark : styles.btn} onClick={() => setSelectedDay(day)}><CalendarDays size={16}/> {day}</button>)}</div></div>
        <div style={styles.card}><div style={{fontSize:14, color:'#71717a'}}>Progreso del día</div><div style={{fontSize:42, fontWeight:800}}>{completedCount}/{(workoutPlan[selectedDay] || []).length}</div><div style={{fontSize:14, color:'#71717a'}}>ejercicios terminados</div></div>
      </div>

      <div style={{display:'grid', gap:16, minWidth:0}}>
        <div style={styles.card}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap', marginBottom:12}}>
            <div><div style={{fontSize:32, fontWeight:800}}>{selectedDay}</div><div style={{fontSize:14, color:'#71717a'}}>Pulsa un ejercicio para entrar en su pantalla</div></div>
            <span style={{...styles.chip, background:'#111827', color:'white'}}>{selectedDate}</span>
          </div>
          <div style={{display:'grid', gap:12}}>
            {dayExercises.map(exercise => {
              const record = getExerciseRecord(selectedDay, exercise);
              const doneSets = record.sets.filter(s => s.done).length;
              return <button key={exercise.name} onClick={() => openExercise(exercise)} style={{border:'1px solid #e4e4e7', background:'#f9fafb', borderRadius:24, padding:16, textAlign:'left', cursor:'pointer'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12}}>
                  <div style={{minWidth:0, flex:1}}>
                    <div style={{display:'flex', alignItems:'center', gap:8, flexWrap:'wrap'}}><div style={{fontSize:22, fontWeight:800}}>{exercise.name}</div><span style={{...styles.chip, background:'white'}}>{exercise.muscle}</span>{state.favorites[exercise.name] ? <Star size={16} color="#84cc16" fill="#84cc16"/> : null}</div>
                    <div style={{display:'flex', gap:8, flexWrap:'wrap', marginTop:10}}>
                      <span style={{...styles.chip, background:'white'}}>{record.sets.length} series</span>
                      <span style={{...styles.chip, background:'white'}}>objetivo {exercise.repGoal}</span>
                      <span style={{...styles.chip, background:'white'}}>descanso {record.rest || exercise.rest}s</span>
                      <span style={{...styles.chip, background: record.completed ? '#dcfce7' : '#e4e4e7', color: record.completed ? '#15803d' : '#3f3f46'}}>{record.completed ? 'hecho' : `${doneSets} series hechas`}</span>
                    </div>
                  </div>
                  <ChevronRight size={20} color="#a1a1aa"/>
                </div>
              </button>
            })}
          </div>
        </div>
        <div style={styles.card}><div style={{fontSize:24, fontWeight:800, marginBottom:12}}>Notas del día</div><textarea value={dayNotes} onChange={(e) => updateDayNotes(e.target.value)} placeholder="Cómo te has visto hoy, qué subirías, molestias, sensaciones..." style={styles.textarea}/></div>
      </div>
    </div>
  </div></div>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
