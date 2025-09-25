<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	let swiperContainer: HTMLElement;
	let swiper: any;
	onMount(async () => {
		if (browser) {
			swiper = new Swiper('.mySwiper', {
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				pagination: {
					el: '.swiper-pagination'
				},
				keyboard: {
					enabled: true,
					onlyInViewport: true
				},
				speed: 400
			});
		}
		return () => {
			if (swiper) {
				swiper.destroy(true, true);
			}
		};
	});
</script>

<svelte:head>
	<!-- Swiper CSS -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
	<!-- Ionic Icons -->
	<script
		type="module"
		src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
	></script>
	<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</svelte:head>

<div class="swiper mySwiper">
	<div class="swiper-wrapper">
		<!-- Slide 1: Title -->
		<div class="swiper-slide">
			<div class="slide-content">
				<div class="slide-number">1/8</div>
				<a href="/game" class="slide-game-cta">
					<strong>Start Game</strong>
				</a>
				<div class="slide-inner">
					<h1 class="title">⚡ BESS Trading Game</h1>
					<div class="battery-display">
						<div class="battery full">
							<div class="battery-fill"></div>
						</div>
					</div>
					<p class="subtitle">
						Welcome to the Battery Energy Storage System trading game! Learn how to maximize revenue
						with smart energy trading decisions.
					</p>
					<div class="goal-badge">
						<strong>Goal: Maximize daily revenue with a 1MW/2MWh BESS</strong>
					</div>
				</div>
			</div>
		</div>

		<!-- Slide 2: Objective -->
		<div class="swiper-slide">
			<div class="slide-content">
				<div class="slide-number">2/8</div>
				<a href="/game" class="slide-game-cta">
					<strong>Start Game</strong>
				</a>
				<div class="slide-inner">
					<h2 class="slide-title">🎯 Objective</h2>
					<p class="slide-text">
						Generate as much <span class="highlight">revenue as possible</span> throughout the entire
						day using your battery energy storage system.
					</p>
					<div class="battery-progression">
						<div class="battery empty">
							<div class="battery-fill"></div>
						</div>
						<span class="arrow">→</span>
						<div class="battery full">
							<div class="battery-fill"></div>
						</div>
					</div>
					<div class="info-grid">
						<p><strong>Starting Condition:</strong> Your BESS begins at 0% State of Charge (SoC)</p>
						<p><strong>Time Horizon:</strong> 24 hourly periods (PTUs)</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Slide 3: Battery Specifications -->
		<div class="swiper-slide">
			<div class="slide-content">
				<div class="slide-number">3/8</div>
				<a href="/game" class="slide-game-cta">
					<strong>Start Game</strong>
				</a>
				<div class="slide-inner">
					<h2 class="slide-title">🔋 Your BESS Specifications</h2>
					<div class="specs-grid">
						<div class="spec-card">
							<h4>Power Rating</h4>
							<p><strong class="spec-value">1 MW</strong><br />Maximum charge/discharge rate</p>
						</div>
						<div class="spec-card">
							<h4>Energy Capacity</h4>
							<p><strong class="spec-value">2 MWh</strong><br />Total energy storage</p>
						</div>
						<div class="spec-card">
							<h4>Starting SoC</h4>
							<p><strong class="spec-value">0%</strong><br />Empty battery at start</p>
						</div>
						<div class="spec-card">
							<h4>Time Periods</h4>
							<p><strong class="spec-value">24 PTUs</strong><br />One decision per hour</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Slide 4: Four Options -->
		<div class="swiper-slide">
			<div class="slide-content">
				<div class="slide-number">4/8</div>
				<a href="/game" class="slide-game-cta">
					<strong>Start Game</strong>
				</a>
				<div class="slide-inner">
					<h2 class="slide-title">⚡ Your Four Options Each Hour</h2>
					<div class="options-grid">
						<div class="option-card blue">
							<h4>1️⃣ FCR-N</h4>
							<p>Sell frequency regulation service</p>
						</div>
						<div class="option-card green">
							<h4>2️⃣ Charge</h4>
							<p>Buy electricity and store energy</p>
						</div>
						<div class="option-card orange">
							<h4>3️⃣ Discharge</h4>
							<p>Sell stored electricity</p>
						</div>
						<div class="option-card gray">
							<h4>4️⃣ Do Nothing</h4>
							<p>Hold current state</p>
						</div>
					</div>
					<p class="note">
						Each hour you must choose exactly <strong>one</strong> of these four actions.
					</p>
				</div>
			</div>
		</div>

		<!-- Slide 5: FCR-N -->
		<div class="swiper-slide">
			<div class="slide-content">
				<div class="slide-number">5/8</div>
				<a href="/game" class="slide-game-cta">
					<strong>Start Game</strong>
				</a>
				<div class="slide-inner">
					<h2 class="slide-title">📊 FCR-N (Frequency Regulation)</h2>
					<p class="slide-text">Sell 1MW of frequency regulation service to the grid.</p>

					<div class="revenue-badge blue">
						<strong>Revenue: Forecasted FCR-N price (lower-upper bound interval)</strong>
					</div>

					<div class="battery-sequence">
						<div class="battery empty"><div class="battery-fill"></div></div>
						<span class="or">or</span>
						<div class="battery full"><div class="battery-fill"></div></div>
						<span class="arrow">→</span>
						<div class="battery half"><div class="battery-fill"></div></div>
					</div>

					<div class="rules-section">
						<p><strong>Key Rules:</strong></p>
						<ul class="rules-list">
							<li>Battery must be at <span class="highlight">50% SoC</span> to sell FCR-N</li>
							<li>After FCR-N hour: battery will be at 50% SoC</li>
							<li>No energy costs involved</li>
						</ul>
					</div>

					<div class="penalty-warning">
						<strong>⚠️ PENALTY: If SoC ≠ 50%, you pay 3x the FCR-N price!</strong>
					</div>
				</div>
			</div>
		</div>

		<!-- Slide 6: Charge -->
		<div class="swiper-slide">
			<div class="slide-content">
				<div class="slide-number">6/8</div>
				<a href="/game" class="slide-game-cta">
					<strong>Start Game</strong>
				</a>
				<div class="slide-inner">
					<h2 class="slide-title">🔌 Charge</h2>
					<p class="slide-text">Buy electricity from the grid and store it in your battery.</p>

					<div class="revenue-badge green">
						<strong>Cost: Day-ahead electricity (SPOT) price per MWh</strong>
					</div>

					<div class="battery-sequence">
						<div class="battery empty"><div class="battery-fill"></div></div>
						<span class="arrow">→</span>
						<div class="battery half"><div class="battery-fill"></div></div>
						<span class="arrow">→</span>
						<div class="battery full"><div class="battery-fill"></div></div>
					</div>

					<div class="rules-section">
						<p><strong>Key Rules:</strong></p>
						<ul class="rules-list">
							<li>Charging increases SoC by <span class="highlight green">50% per hour</span></li>
							<li>Can charge for 2 consecutive hours (0% → 50% → 100%)</li>
							<li>If already at 100%, charging does nothing (no cost/revenue)</li>
							<li>Each charge action stores <span class="highlight green">1 MWh</span></li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!-- Slide 7: Discharge -->
		<div class="swiper-slide">
			<div class="slide-content">
				<div class="slide-number">7/8</div>
				<a href="/game" class="slide-game-cta">
					<strong>Start Game</strong>
				</a>
				<div class="slide-inner">
					<h2 class="slide-title">🔋 Discharge</h2>
					<p class="slide-text">Sell stored electricity back to the grid.</p>

					<div class="revenue-badge orange">
						<strong>Revenue: Day-ahead electricity (SPOT) price per MWh</strong>
					</div>

					<div class="battery-sequence">
						<div class="battery full"><div class="battery-fill"></div></div>
						<span class="arrow">→</span>
						<div class="battery half"><div class="battery-fill"></div></div>
						<span class="arrow">→</span>
						<div class="battery empty"><div class="battery-fill"></div></div>
					</div>

					<div class="rules-section">
						<p><strong>Key Rules:</strong></p>
						<ul class="rules-list">
							<li>
								Discharging decreases SoC by <span class="highlight orange">50% per hour</span>
							</li>
							<li>Can discharge for 2 consecutive hours (100% → 50% → 0%)</li>
							<li>If already at 0%, discharging does nothing (no cost/revenue)</li>
							<li>Each discharge action sells <span class="highlight orange">1 MWh</span></li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!-- Slide 8: Summary -->
		<div class="swiper-slide">
			<div class="slide-content">
				<div class="slide-number">8/8</div>
				<a href="/game" class="slide-game-cta">
					<strong>Start Game</strong>
				</a>
				<div class="slide-inner">
					<h2 class="slide-title">🎯 Strategy Summary</h2>
					<p class="slide-text">Now you understand the game! Here's your decision framework:</p>

					<div class="strategy-grid">
						<div class="strategy-card blue">
							<h4>FCR-N Strategy</h4>
							<p>High revenue potential, but requires 50% SoC positioning</p>
						</div>
						<div class="strategy-card green">
							<h4>Arbitrage Strategy</h4>
							<p>Buy low (charge), sell high (discharge) based on SPOT prices</p>
						</div>
						<div class="strategy-card purple">
							<h4>Timing is Key</h4>
							<p>Plan your SoC levels to maximize revenue opportunities</p>
						</div>
						<div class="strategy-card red">
							<h4>Risk Management</h4>
							<p>Avoid FCR-N penalties by managing your battery state</p>
						</div>
					</div>

					<a href="/game" class="final-cta">
						<strong>Start Game</strong>
					</a>
				</div>
			</div>
		</div>
	</div>
	<div class="swiper-button-next"></div>
	<div class="swiper-button-prev"></div>
	<div class="swiper-pagination"></div>
</div>

<style>
	.swiper {
		width: 100%;
		height: 80vh;
	}

	.swiper-slide {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #ffffff;
	}

	.slide-content {
		width: 100%;
		max-width: 1200px;
		padding: 1.5rem;
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow-y: auto;
	}

	.slide-number {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		background: #dbeafe;
		color: #2563eb;
		padding: 0.5rem 1rem;
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.slide-game-cta {
		position: absolute;
		top: 1.5rem;
		right: 1 rem;
		background: black;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.slide-inner {
		text-align: center;
	}

	.title {
		font-size: 3rem;
		font-weight: bold;
		color: #111827;
		margin-bottom: 1.5rem;
	}

	.slide-title {
		font-size: 2.25rem;
		font-weight: bold;
		color: #111827;
		margin-bottom: 1.5rem;
	}

	.subtitle,
	.slide-text {
		font-size: 1.125rem;
		color: #4b5563;
		margin-bottom: 1.5rem;
		max-width: 42rem;
		margin-left: auto;
		margin-right: auto;
		line-height: 1.5;
	}

	.highlight {
		color: #2563eb;
		font-weight: 600;
	}

	.highlight.green {
		color: #16a34a;
	}
	.highlight.orange {
		color: #ea580c;
	}

	.goal-badge,
	.final-cta {
		background: #2563eb;
		color: white;
		padding: 1rem 2rem;
		border-radius: 0.75rem;
		display: inline-block;
		font-size: 1rem;
		font-weight: 600;
	}

	.final-cta {
		background: #111827;
		margin-top: 1.5rem;
	}

	/* Battery Styles */
	.battery {
		position: relative;
		width: 4rem;
		height: 2rem;
		border: 2px solid #374151;
		border-radius: 0.5rem;
		background: #f9fafb;
	}

	.battery::after {
		content: '';
		width: 6px;
		height: 20px;
		background: #374151;
		position: absolute;
		right: -9px;
		top: 50%;
		transform: translateY(-50%);
		border-radius: 0 2px 2px 0;
	}

	.battery-fill {
		height: 100%;
		border-radius: 3px;
		transition: all 0.3s ease;
	}

	.battery.empty .battery-fill {
		width: 0;
		background: #ef4444;
	}

	.battery.half .battery-fill {
		width: 50%;
		background: #facc15;
	}

	.battery.full .battery-fill {
		width: 100%;
		background: linear-gradient(to right, #10b981, #3b82f6);
	}

	.battery-display {
		display: flex;
		justify-content: center;
		margin-bottom: 1.5rem;
	}

	.battery-display .battery {
		width: 6rem;
		height: 3rem;
	}

	.battery-progression,
	.battery-sequence {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin: 1.5rem 0;
		flex-wrap: wrap;
	}

	.arrow {
		font-size: 1.5rem;
		color: #9ca3af;
	}

	.or {
		font-size: 0.875rem;
		color: #9ca3af;
	}

	/* Grid Layouts */
	.specs-grid,
	.options-grid,
	.strategy-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
		max-width: 64rem;
		margin-left: auto;
		margin-right: auto;
	}

	.spec-card,
	.option-card,
	.strategy-card {
		background: #f9fafb;
		padding: 1rem;
		border-radius: 0.75rem;
		border: 1px solid #e5e7eb;
		transition: box-shadow 0.2s;
	}

	.spec-card:hover,
	.option-card:hover,
	.strategy-card:hover {
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}

	.spec-card h4,
	.option-card h4,
	.strategy-card h4 {
		font-size: 1.125rem;
		font-weight: 600;
		color: #111827;
		margin-bottom: 0.75rem;
	}

	.spec-value {
		font-size: 1.5rem;
		color: #2563eb;
	}

	/* Option Card Colors */
	.option-card.blue {
		background: #dbeafe;
		border-left: 4px solid #2563eb;
	}
	.option-card.blue h4 {
		color: #2563eb;
	}

	.option-card.green {
		background: #dcfce7;
		border-left: 4px solid #16a34a;
	}
	.option-card.green h4 {
		color: #16a34a;
	}

	.option-card.orange {
		background: #fed7aa;
		border-left: 4px solid #ea580c;
	}
	.option-card.orange h4 {
		color: #ea580c;
	}

	.option-card.gray {
		background: #f9fafb;
		border-left: 4px solid #6b7280;
	}
	.option-card.gray h4 {
		color: #6b7280;
	}

	/* Strategy Card Colors */
	.strategy-card.blue {
		background: #dbeafe;
		border-left: 4px solid #2563eb;
	}
	.strategy-card.blue h4 {
		color: #2563eb;
	}

	.strategy-card.green {
		background: #dcfce7;
		border-left: 4px solid #16a34a;
	}
	.strategy-card.green h4 {
		color: #16a34a;
	}

	.strategy-card.purple {
		background: #f3e8ff;
		border-left: 4px solid #9333ea;
	}
	.strategy-card.purple h4 {
		color: #9333ea;
	}

	.strategy-card.red {
		background: #fee2e2;
		border-left: 4px solid #dc2626;
	}
	.strategy-card.red h4 {
		color: #dc2626;
	}

	/* Revenue Badges */
	.revenue-badge {
		padding: 0.75rem 1.5rem;
		border-radius: 0.75rem;
		color: white;
		display: inline-block;
		margin: 1rem 0;
		font-size: 0.875rem;
		font-weight: 600;
	}

	.revenue-badge.blue {
		background: #2563eb;
	}
	.revenue-badge.green {
		background: #16a34a;
	}
	.revenue-badge.orange {
		background: #ea580c;
	}

	/* Rules Section */
	.rules-section {
		max-width: 42rem;
		margin: 2rem auto;
		text-align: left;
	}

	.rules-section p {
		text-align: center;
		font-weight: 600;
		color: #374151;
		margin-bottom: 1rem;
	}

	.rules-list {
		list-style: none;
		padding: 0;
	}

	.rules-list li {
		padding: 0.5rem 0;
		color: #374151;
		text-align: center;
	}

	.rules-list li::before {
		content: '•';
		color: #2563eb;
		font-weight: bold;
		margin-right: 0.5rem;
	}

	.penalty-warning {
		background: #fee2e2;
		border: 1px solid #fecaca;
		color: #dc2626;
		padding: 1rem 1.5rem;
		border-radius: 0.75rem;
		max-width: 32rem;
		margin: 2rem auto;
		font-size: 0.875rem;
		font-weight: 600;
	}

	.note {
		font-size: 1rem;
		color: #374151;
		margin-top: 2rem;
	}

	.info-grid {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 2rem;
	}

	.info-grid p {
		font-size: 1rem;
		color: #374151;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.slide-content {
			padding: 1rem;
		}

		.title {
			font-size: 2rem;
		}

		.slide-title {
			font-size: 1.75rem;
		}

		.subtitle,
		.slide-text {
			font-size: 1rem;
		}

		.specs-grid,
		.options-grid,
		.strategy-grid {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}

		.battery-progression,
		.battery-sequence {
			gap: 0.5rem;
		}

		.spec-card,
		.option-card,
		.strategy-card {
			padding: 0.75rem;
		}
	}
</style>
