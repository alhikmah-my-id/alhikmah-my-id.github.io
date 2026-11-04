# ============================================================
# ALHIKMAH — Makefile
# Portal Islam Terpercaya | alhikmah.my.id
# Design By ADMIN ALHIKMAH | Copyright 2025 All Application
# International Islamic (ALHIKMAH.MY.ID)
# ============================================================

APP_NAME        := alhikmah
FLUTTER         := flutter
DART            := dart
PYTHON          := python3
NODE            := node
NPM             := npm
BUNDLE_ID       := id.my.alhikmah
ANDROID_PKG     := id.my.alhikmah
WEB_OUT         := build/web
PAGES_PROJECT   := al-hikmah

.DEFAULT_GOAL := help
.PHONY: help
help: ## Show this help
	@echo ""
	@echo "  ALHIKMAH — Available targets"
	@echo "  ------------------------------------------------------------"
	@grep -E '^[a-zA-Z0-9_.-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-22s\033[0m %s\n", $$1, $$2}'
	@echo ""

# ------------------------------------------------------------
# Setup
# ------------------------------------------------------------
.PHONY: setup
setup: ## Install all dependencies (Flutter, Node, Python)
	$(FLUTTER) pub get
	$(NPM) install
	$(PYTHON) -m pip install --upgrade pip
	$(PYTHON) -m pip install -r requirements.txt

.PHONY: clean
clean: ## Clean build artifacts
	$(FLUTTER) clean
	rm -rf build/ .dart_tool/ coverage/
	rm -rf node_modules/ __pycache__/ .pytest_cache/
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true

.PHONY: get
get: ## Flutter pub get
	$(FLUTTER) pub get

.PHONY: upgrade
upgrade: ## Upgrade Flutter dependencies
	$(FLUTTER) pub upgrade

.PHONY: doctor
doctor: ## Run flutter doctor
	$(FLUTTER) doctor -v

# ------------------------------------------------------------
# Code Generation
# ------------------------------------------------------------
.PHONY: gen
gen: ## Run build_runner code generation
	$(DART) run build_runner build --delete-conflicting-outputs

.PHONY: gen-watch
gen-watch: ## Run build_runner in watch mode
	$(DART) run build_runner watch --delete-conflicting-outputs

.PHONY: gen-clean
gen-clean: ## Clean generated files
	$(DART) run build_runner clean

# ------------------------------------------------------------
# Quality
# ------------------------------------------------------------
.PHONY: analyze
analyze: ## Run static analysis
	$(FLUTTER) analyze

.PHONY: format
format: ## Format Dart code
	$(DART) format lib test

.PHONY: format-check
format-check: ## Check Dart formatting
	$(DART) format --output=none --set-exit-if-changed lib test

.PHONY: lint
lint: analyze format-check ## Run all linters

# ------------------------------------------------------------
# Testing
# ------------------------------------------------------------
.PHONY: test
test: ## Run unit & widget tests
	$(FLUTTER) test --coverage

.PHONY: test-watch
test-watch: ## Run tests in watch mode
	$(FLUTTER) test --watch

.PHONY: test-integration
test-integration: ## Run integration tests
	$(FLUTTER) test integration_test

.PHONY: coverage
coverage: test ## Generate and open coverage report
	@which genhtml > /dev/null 2>&1 && genhtml coverage/lcov.info -o coverage/html || true
	@echo "Coverage report: coverage/html/index.html"

# ------------------------------------------------------------
# Run
# ------------------------------------------------------------
.PHONY: run
run: ## Run app on default device
	$(FLUTTER) run

.PHONY: run-web
run-web: ## Run app in Chrome (web)
	$(FLUTTER) run -d chrome --web-port=8080

.PHONY: run-android
run-android: ## Run app on Android device
	$(FLUTTER) run -d android

.PHONY: run-ios
run-ios: ## Run app on iOS simulator
	$(FLUTTER) run -d ios

.PHONY: run-release
run-release: ## Run app in release mode
	$(FLUTTER) run --release

# ------------------------------------------------------------
# Build — Android
# ------------------------------------------------------------
.PHONY: build-apk
build-apk: ## Build Android APK (release)
	$(FLUTTER) build apk --release --split-per-abi

.PHONY: build-apk-universal
build-apk-universal: ## Build universal Android APK
	$(FLUTTER) build apk --release

.PHONY: build-aab
build-aab: ## Build Android App Bundle (Play Store)
	$(FLUTTER) build appbundle --release

.PHONY: build-android-all
build-android-all: build-apk build-aab ## Build all Android artifacts

# ------------------------------------------------------------
# Build — iOS
# ------------------------------------------------------------
.PHONY: build-ios
build-ios: ## Build iOS (no codesign)
	$(FLUTTER) build ios --release --no-codesign

.PHONY: build-ipa
build-ipa: ## Build iOS IPA
	$(FLUTTER) build ipa --release

# ------------------------------------------------------------
# Build — Web
# ------------------------------------------------------------
.PHONY: build-web
build-web: ## Build web release
	$(FLUTTER) build web --release --web-renderer canvaskit

.PHONY: build-web-html
build-web-html: ## Build web with HTML renderer (lighter)
	$(FLUTTER) build web --release --web-renderer html

.PHONY: serve-web
serve-web: build-web ## Build and serve web locally
	cd $(WEB_OUT) && $(PYTHON) -m http.server 8080

# ------------------------------------------------------------
# Deploy — Cloudflare Pages
# ------------------------------------------------------------
.PHONY: deploy-web
deploy-web: build-web ## Deploy web to Cloudflare Pages
	npx wrangler pages deploy $(WEB_OUT) --project-name=$(PAGES_PROJECT)

.PHONY: deploy-preview
deploy-preview: build-web ## Deploy web preview to Cloudflare Pages
	npx wrangler pages deploy $(WEB_OUT) --project-name=$(PAGES_PROJECT) --branch=preview

# ------------------------------------------------------------
# Backend (Node.js)
# ------------------------------------------------------------
.PHONY: server
server: ## Start Express backend server
	$(NODE) server.js

.PHONY: server-dev
server-dev: ## Start backend with nodemon
	npx nodemon server.js

.PHONY: server-test
server-test: ## Test backend endpoints
	curl -s http://localhost:3000/api/articles | head -c 500

# ------------------------------------------------------------
# Python Automation
# ------------------------------------------------------------
.PHONY: py-generate
py-generate: ## Generate 30 seed articles
	$(PYTHON) generator.py

.PHONY: py-article
py-article: ## Generate a single SEO article (3000+ words)
	$(PYTHON) artikel.py --topic "Keutamaan Sholat Tahajud" --category "Pendidikan"

.PHONY: py-tools
py-tools: ## Run Islamic tools backend module
	$(PYTHON) tools.py --action list

.PHONY: py-pegon
py-pegon: ## Convert text to Arabic Pegon
	$(PYTHON) tools.py --action pegon --text "Bismillahirrahmanirrahim"

.PHONY: py-calendar
py-calendar: ## Show Hijri calendar for today
	$(PYTHON) tools.py --action kalender

.PHONY: py-test
py-test: ## Run Python tests
	$(PYTHON) -m pytest -v

.PHONY: py-lint
py-lint: ## Lint Python code
	$(PYTHON) -m ruff check .
	$(PYTHON) -m black --check .

.PHONY: py-format
py-format: ## Format Python code
	$(PYTHON) -m black .
	$(PYTHON) -m ruff check --fix .

# ------------------------------------------------------------
# Ads & Monetization
# ------------------------------------------------------------
.PHONY: ads-validate
ads-validate: ## Validate ads.txt and app-ads.txt
	@echo "Validating ads.txt..."
	@test -f public/ads.txt && echo "  ✓ ads.txt exists" || echo "  ✗ ads.txt missing"
	@test -f public/app-ads.txt && echo "  ✓ app-ads.txt exists" || echo "  ✗ app-ads.txt missing"
	@echo "Tappx App Keys:"
	@grep -oE 'pub-[0-9]+-android-[0-9]+' public/app-ads.txt 2>/dev/null | sort -u || true

.PHONY: ads-rotate
ads-rotate: ## Show current Tappx rotation keys
	@echo "Tappx rotation pool:"
	@echo "  pub-65263-android-0300"
	@echo "  pub-57747-android-0996"
	@echo "  pub-60567-android-4416"
	@echo "  pub-65262-android-8892"
	@echo "  pub-79956-android-6297"
	@echo "  pub-79955-android-5582"

# ------------------------------------------------------------
# CI / Full Pipeline
# ------------------------------------------------------------
.PHONY: ci
ci: get gen lint test ## Run full CI pipeline
	@echo "CI pipeline complete."

.PHONY: release
release: clean get gen lint test build-web build-aab ## Full release build
	@echo "Release artifacts ready in build/"

.PHONY: all
all: setup ci build-web ## Setup, test, and build web
	@echo "ALHIKMAH build complete."