import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Home.module.css';

const apiData = {
  api_names: [
    {
      category: "Simple & Descriptive",
      names: [
        "DataStream API",
        "QuickFetch API",
        "CoreConnect API",
        "WebFlow API",
        "InfoRoute API",
        "RapidSync API",
        "KeyVault API",
        "DocServe API",
        "ImagePrime API",
        "TaskMaster API"
      ]
    },
    {
      category: "Modern & Abstract",
      names: [
        "Apex API",
        "Zenith API",
        "Nebula API",
        "Quantum API",
        "Vector API",
        "Synapse API",
        "Chroma API",
        "Velocity API",
        "Catalyst API",
        "Horizon API"
      ]
    },
    {
      category: "Techy & Geeky",
      names: [
        "BitForge API",
        "CodeNexus API",
        "ByteStream API",
        "AlgoHub API",
        "CipherLink API",
        "LogicGate API",
        "KernelFlow API",
        "HexaCore API",
        "PixelDrive API",
        "ScriptSync API"
      ]
    },
    {
      category: "Creative & Evocative",
      names: [
        "Echo API",
        "Luminary API",
        "Odyssey API",
        "Phoenix API",
        "Radiant API",
        "Voyager API",
        "Whisper API",
        "Aurora API",
        "Harmony API",
        "Meridian API"
      ]
    },
    {
      category: "Domain-Specific (Finance)",
      names: [
        "FinData API",
        "MarketPulse API",
        "TradeStream API",
        "LedgerLink API",
        "QuoteSync API",
        "InvestHub API",
        "RiskWatch API",
        "CapitalFlow API",
        "WealthView API",
        "PortfolioPrime API"
      ]
    }
  ]
};

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const allApis = apiData.api_names.flatMap(category => 
    category.names.map(name => ({ name, category: category.category }))
  );

  const filteredApis = allApis.filter(api => 
    api.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || api.category === selectedCategory)
  );

  const categories = ['', ...new Set(apiData.api_names.map(category => category.category))];

  return (
    <div className="home">
      <h1 className="home-title">Blueprints - Your Hub for APIs</h1>
      
      <div className="search-container">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category || 'All Categories'}</option>
          ))}
        </select>
      </div>

      <div className="api-list">
        {filteredApis.map((api, index) => (
          <div key={index} className="api-item">
            <span className="api-name">{api.name}</span>
            <span className="api-category">{api.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;