
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code, Cloud } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  diagramType: string;
  onDiagramTypeChange: (type: string) => void;
  disabled?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  code, 
  onChange, 
  diagramType, 
  onDiagramTypeChange, 
  disabled 
}) => {
  const diagramTypes = [
    { 
      value: 'AWS', 
      label: 'Arquitectura AWS', 
      icon: '☁️',
      placeholder: `# Diagrama de Arquitectura AWS
# Ejemplo:
from diagrams import Diagram
from diagrams.aws.compute import EC2
from diagrams.aws.database import RDS
from diagrams.aws.network import ELB

with Diagram("Arquitectura Web", show=False):
    lb = ELB("balanceador")
    web = EC2("servidor web")
    db = RDS("base de datos")
    
    lb >> web >> db`
    },
    { 
      value: 'ER', 
      label: 'Diagrama ER', 
      icon: '🛢️',
      placeholder: `-- Diagrama Entidad-Relación
-- Ejemplo:
[users] {bgcolor: "#d0e0d0"}
  *id {label: "int, not null"}
  name {label: "varchar, not null"}
  email {label: "varchar, unique"}
  created_at {label: "timestamp"}

[posts] {bgcolor: "#ececfc"}  
  *id {label: "int, not null"}
  +user_id {label: "int, not null, FK(users)"}
  title {label: "varchar, not null"}
  content {label: "text"}
  
users ||--o{ posts`
    },
    { 
      value: 'JSON', 
      label: 'Estructura JSON', 
      icon: '{}',
      placeholder: `{
  "proyecto": {
    "nombre": "UTEC Diagram Studio",
    "version": "1.0.0",
    "tecnologias": {
      "frontend": ["React", "TypeScript", "Tailwind"],
      "backend": ["AWS Lambda", "Python", "DynamoDB"],
      "deployment": ["S3", "CloudFront", "API Gateway"]
    },
    "arquitectura": {
      "patron": "Serverless",
      "componentes": [
        {
          "nombre": "Editor",
          "funcion": "Entrada de código"
        },
        {
          "nombre": "Generador", 
          "funcion": "Procesamiento"
        }
      ]
    }
  }
}`
    }
  ];

  const currentType = diagramTypes.find(type => type.value === diagramType);

  return (
    <Card className="code-editor h-full border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center">
          <Code className="w-5 h-5 mr-2" />
          Editor de Código
        </CardTitle>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
        </div>
        
        {/* Selector de Tipo de Diagrama */}
        <div className="mt-4">
          <Select value={diagramType} onValueChange={onDiagramTypeChange}>
            <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Selecciona el tipo de diagrama" />
            </SelectTrigger>
            <SelectContent className="utec-card border-0">
              {diagramTypes.map((type) => (
                <SelectItem 
                  key={type.value} 
                  value={type.value}
                  className="text-white hover:bg-white/10 focus:bg-white/10"
                >
                  <div className="flex items-center">
                    <span className="mr-2 text-lg">{type.icon}</span>
                    {type.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="h-full pb-4">
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={currentType?.placeholder || '// Selecciona un tipo de diagrama arriba'}
          className="w-full h-96 bg-transparent text-utec-light font-mono text-sm resize-none border-0 outline-none placeholder-white/40 leading-relaxed"
          style={{ minHeight: '400px' }}
        />
      </CardContent>
    </Card>
  );
};

export default CodeEditor;
